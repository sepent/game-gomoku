var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

// Start server at port
app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

// Event when client connect to socket server
io.on('connection', function (socket) {
  socket.emit('connection', {id: socket.id});

  // Event when disconnect
  socket.on('disconnect', function(){
    if (socket.user) {
      console.log(socket.user.displayName + ' disconnected');
    }
  });

  // SERVER EVENT
  // Trigger event found the match
  socket.emit('found', {match: '123'});

  // CLIENT EVENT
  // Event when register info
  socket.on('client::start', function(data){
    socket.user = data;
    console.log(data);
  });

  // Event when finding the match
  socket.on('client::finding', function(){
    console.log(socket.user.displayName + ' finding ...');

    setTimeout(function(){
      socket.emit('server::found', {
        me: {
          id: 1,
          name: "Toi"
        },
        rival: {
          id: 2,
          name: "Player"
        },
        innings: 1
      });

      // If another user cancel
      setTimeout(function(){
        socket.emit('server::cancel');
      }, 2000);
    }, 3000);
  });

  // Event when accept
  socket.on('client::accept', function(){
    console.log('user accepted');
    socket.emit('server::playing');
  });

  // Event when accept
  socket.on('client::cancel', function(){
    console.log('user canceled');
  });

  // Event when choosen
  socket.on('client::chosen', function(data){
    console.log(data);
  });
});
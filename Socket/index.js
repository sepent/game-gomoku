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
      socket.leave('random_room');
      // io.to('random_room').emit('endgame', {
      //   type: 'win'
      // });
      io.to('random_room').emit('rival-disconnect');
    }
  });

  // SERVER EVENT
  // Trigger event found the match
  socket.emit('found', {match: '123'});

  // Event when finding the match
  socket.on('client::finding', function(data){
    socket.user = data;
    socket.join('random_room');

    if (io.sockets.adapter.rooms['random_room'].length == 2) {
      io.to('random_room').emit('server::found', {
        me: {
          id: socket.user.id,
          name: "Toi"
        },
        rival: {
          id: socket.user.id === 1 ? 2 : 1,
          name: "Player"
        },
        innings: 1
      });
    }
  });

  // Event when accept
  socket.on('client::accept', function(){
    io.to('random_room').emit('server::playing');
  });

  // Event when accept
  socket.on('client::cancel', function(){
    io.to('random_room').emit('server::cancel');
  });

  // Event when choosen
  socket.on('client::chosen', function(chessman){
    io.to('random_room').emit('server::chosen', {player: socket.user.id, innings: socket.user.id === 1 ? 2 : 1, chessman});
  });
});
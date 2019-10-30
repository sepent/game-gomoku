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

  // Event when register info
  socket.on('start', function(data){
    socket.user = data;
    console.log(data);
  });

  // Event when disconnect
  socket.on('disconnect', function(){
    console.log(socket.user.displayName + ' disconnected');
  });

  // Event when finding the match
  socket.on('finding', function(){
    console.log(socket.user.displayName + ' finding ...');
  });

  // Trigger event found the match
  socket.emit('found', {match: '123'});

  // Event when accept
  socket.on('accept', function(){
    socket.emit('playing');
  });

  // Event when choosen
  socket.on('chosen', function(data){
    console.log(data);
  });

  // Trigger with name "news"
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
});
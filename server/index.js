const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('Id', socket.id);

  socket.on('message', (data) => {
    io.emit('message', data);
  });

  /*socket.on('user', (data) => {
    let currentuser = data.currentuser;
    let selecteduser = data.selecteduser;
    let obj = {currentuser, selecteduser};
    io.emit('user', obj);
  });
  socket.on('socketId', (data) => {
    let message = data.message;
    let socketId = data.socketId;
    let obj = {message, socketId};
    io.emit('socketId', obj);
  });*/
  
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});


httpServer.listen(port, () => console.log(`listening on port ${port}`));
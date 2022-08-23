const app = require('express')();
const fs = require('fs');
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
const httpServer = require('https').createServer(options, app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 8000;

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('Id', socket.id);

  socket.on('message', (data) => {
    io.emit('message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});


httpServer.listen(port, () => console.log(`listening on port ${port}`));
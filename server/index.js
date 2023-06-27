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

    socket.on('disconnect', () => {
        console.log('a user disconnected!');
    });
});


httpServer.listen(port, () => console.log(`listening on port ${port}`));
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import connectDB from './mongodb/connect.js';

import userRouter from './routes/user.routes.js';
import contactRouter from './routes/contact.routes.js';
import imageRouter from './routes/image.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', function (req, res) {
  res.send('Hi');
});

app.use( '/', userRouter);
app.use( '/', contactRouter);
app.use( '/',imageRouter);

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(3001, () => console.log('Server started on port 3001'));
  } catch(error) {
    console.log(error);
  }
}

startServer();

//socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {origin : '*'}
});
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

const port = 3000;

httpServer.listen(port, () => console.log(`listening on port ${port}`));

import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import { logger } from './config/logger.js';
import IndexRoutes from './Routes/index.js';
import { Server } from "socket.io";
import http from 'http';

const app = express();

const PORT = process.env.PORT || 8001;


const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})


io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  io.emit('users', io.engine.clientsCount);

  socket.emit('users', io.engine.clientsCount);
  
  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
    io.emit('users', io.engine.clientsCount);
  });



});



app.use(cors({ origin: '*' }));

app.use(pinoHttp({
  logger,
  autoLogging: {
    ignore: (req) => req.url?.includes('/socket.io')
  }
}));

app.use(express.json());

app.use(IndexRoutes);

app.get('/', (req, res) => {
  req.log.info('Hello World route accessed');
  res.send('Hello Worldvdfdsf');
})

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
})

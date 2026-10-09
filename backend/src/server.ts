import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import { pinoHttp } from 'pino-http';
import { logger } from './config/logger.js';
import IndexRoutes from './Routes/index.js';
import { Server } from "socket.io";
import http from 'http';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';


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

// enforces security headers using Helmet middleware. It sets the X-Frame-Options header to 'sameorigin', enables the X-Content-Type-Options header, and disables the X-Powered-By header to prevent revealing information about the server.

app.use(helmet({
  xFrameOptions: {
    action: 'sameorigin',

  },
  xContentTypeOptions: true,
  xPoweredBy: false,
}));


// app.use(rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes,
//   limit: 100, // Limit each IP to 100 requests per windowMs
//   standardHeaders: 'draft-8', // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   ipv6Subnet: 60
// }))

app.use(IndexRoutes);

app.get('/', (req, res) => {
  req.log.info('Hello World route accessed');
  res.send('Hello Worldvdfdsf');
})

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
})

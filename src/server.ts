import 'dotenv/config'
import express from 'express';
import { pinoHttp } from 'pino-http';
import { logger } from './config/logger.js';
import IndexRoutes from './Routes/index.js';

const app = express();

const PORT = process.env.PORT || 8000;


app.use(pinoHttp({
    logger,
}));



app.use(express.json());


app.use( IndexRoutes);


app.get('/', (req, res) => {
    req.log.info('Hello World route accessed');
    res.send('Hello Worldvdfdsf');
})


app.listen(PORT, () => { 
    logger.info(`Server is running on port ${PORT}`);
})
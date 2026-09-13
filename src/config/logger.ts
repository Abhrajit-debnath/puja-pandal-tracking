import { pino, type LoggerOptions } from "pino";

const isProduction = process.env.NODE_ENV === 'production';

const config: LoggerOptions = {
    level: isProduction ? 'info' : 'debug',
};

if (!isProduction) {
    config.transport = {
        target: 'pino-pretty',
        options: { colorize: true }
    };
}

export const logger = pino(config);
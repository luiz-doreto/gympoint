import 'dotenv/config';
import express from 'express';
import Youch from 'youch';
import cors from 'cors';
import helmet from 'helmet';
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';

import 'express-async-errors';

import routes from './routes';

import './database';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }

    middlewares() {
        this.server.use(helmet());
        this.server.use(cors());
        this.server.use(express.json());

        if (process.env.NODE_ENV !== 'development') {
            this.server.use(new RateLimit({
                store: new RateLimitRedis({
                    client: redis.createClient({
                        host: process.env.REDIS_HOST,
                        port: process.env.REDIS_PORT,
                    }),
                }),
                windowMs: 1000 * 60 * 15,
                max: 100,
            }));
        }
    }

    routes() {
        this.server.use(routes);
    }

    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            if (process.env.NODE_ENV === 'development') {
                const errors = await new Youch(err, req).toJSON();

                return res.status(500).json(errors);
            }

            return res.status(500).json({ error: 'Internal server error' });
        });
    }
}

export default new App().server;

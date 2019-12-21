import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authorization.split(' ');
    try {
        await promisify(jwt.verify)(token, authConfig.secret);
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid Token' });
    }
};

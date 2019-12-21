import User from '../models/User';

export default async (req, res, next) => {
    const user = await User.findByPk(req.userId);

    if (!user.admin) {
        return res
            .status(401)
            .json({ error: 'Permission denied! Only admins can access this' });
    }

    return next();
};

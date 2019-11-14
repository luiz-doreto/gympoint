import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';

class CheckinController {
    async index(req, res) {
        const { id } = req.params;
        const checkins = await Checkin.findAll({ where: { student_id: id } });

        return res.json(checkins);
    }

    async store(req, res) {
        const { id } = req.params;

        const now = new Date();
        const oneWeekAgo = subDays(now, 7);

        const checkins = await Checkin.findAll({
            where: {
                student_id: id,
                created_at: {
                    [Op.between]: [oneWeekAgo, now],
                },
            },
        });

        if (checkins.length === 5) {
            return res
                .status(401)
                .json({ error: 'You already trained 5 times this week' });
        }

        const checkin = await Checkin.create({ student_id: id });

        return res.json(checkin);
    }
}

export default new CheckinController();

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import AnswerHelpOrder from '../jobs/AnswerHelpOrder';
import paginate from '../../util/paginate';

class HelpOrderController {
    async index(req, res) {
        const { page, pageSize } = req.query;

        const helpOrders = await HelpOrder.findAndCountAll({
            where: {
                answer: null,
            },
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['name'],
                },
            ],
            order: ['created_at'],
            ...paginate(page, pageSize),
        });

        return res.json(helpOrders);
    }

    async update(req, res) {
        const { id } = req.params;
        const { answer } = req.body;

        const helpOrder = await HelpOrder.findOne({
            where: { id },
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['name', 'email'],
                },
            ],
        });

        const answeredHelpOrder = await helpOrder.update({
            answer,
            answer_at: new Date(),
        });

        await Queue.add(AnswerHelpOrder.key, {
            helpOrder: answeredHelpOrder,
        });

        return res.json(answeredHelpOrder);
    }
}

export default new HelpOrderController();

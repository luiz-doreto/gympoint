import HelpOrder from '../models/HelpOrder';

class StudentHelpOrderController {
    async index(req, res) {
        const { id } = req.params;

        const helpOrders = await HelpOrder.findAll({
            where: { student_id: id },
        });

        return res.json(helpOrders);
    }

    async store(req, res) {
        const { id } = req.params;

        const helpOrder = await HelpOrder.create({
            ...req.body,
            student_id: id,
        });

        return res.json(helpOrder);
    }
}

export default new StudentHelpOrderController();

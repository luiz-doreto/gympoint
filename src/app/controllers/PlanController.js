import Plan from '../models/Plan';
import paginate from '../../util/paginate';

class PlanController {
    async index(req, res) {
        const { page, pageSize } = req.query;

        const plans = await Plan.findAndCountAll({
            order: ['title'],
            ...paginate(page, pageSize),
        });

        return res.json(plans);
    }

    async show(req, res) {
        const { id } = req.params;
        const plan = await Plan.findOne({ where: { id } });

        return res.json(plan);
    }

    async store(req, res) {
        const plan = await Plan.create(req.body);

        return res.json(plan);
    }

    async update(req, res) {
        const { id } = req.params;

        const plan = await Plan.findByPk(id);
        const updatedPlan = await plan.update(req.body);

        return res.json(updatedPlan);
    }

    async delete(req, res) {
        const { id } = req.params;

        const plan = await Plan.findByPk(id);
        await plan.destroy();

        return res.json();
    }
}

export default new PlanController();

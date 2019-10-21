import Plan from '../models/Plan';

class PlanController {
    async index(req, res) {
        const plans = await Plan.findAll();

        return res.json(plans);
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

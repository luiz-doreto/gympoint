import { parseISO, addMonths } from 'date-fns';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Welcome from '../jobs/Welcome';
import Queue from '../../lib/Queue';
import paginate from '../../util/paginate';

class RegistrationController {
    async index(req, res) {
        const { page, pageSize } = req.query;

        const registrations = await Registration.findAndCountAll({
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['name'],
                },
                {
                    model: Plan,
                    as: 'plan',
                    attributes: ['title'],
                },
            ],
            order: [['student', 'name']],
            ...paginate(page, pageSize),
        });

        return res.json(registrations);
    }

    async show(req, res) {
        const { id } = req.params;

        const registration = await Registration.findOne({
            where: { id },
            include: [
                {
                    model: Student,
                    as: 'student',
                    attributes: ['id', 'name'],
                },
                {
                    model: Plan,
                    as: 'plan',
                    attributes: ['id', 'title', 'duration', 'total_price'],
                },
            ],
        });

        return res.json(registration);
    }

    async store(req, res) {
        const { student_id, plan_id, start_date } = req.body;

        const plan = await Plan.findByPk(plan_id);

        if (!plan) {
            return res.status(400).json({ error: 'Plan not found'});
        }

        const startDate = parseISO(start_date);
        const end_date = addMonths(startDate, plan.duration);
        const price = plan.total_price;

        const registration = await Registration.create({
            student_id,
            plan_id,
            start_date,
            end_date,
            price,
        });

        const student = await Student.findByPk(student_id);

        await Queue.add(Welcome.key, {
            student,
            plan,
            start_date,
            end_date,
            price,
        });

        return res.json(registration);
    }

    async update(req, res) {
        const { id } = req.params;
        const { student_id, plan_id, start_date } = req.body;

        const registration = await Registration.findByPk(id);
        const plan = await Plan.findByPk(plan_id);

        const startDate = parseISO(start_date);
        const end_date = addMonths(startDate, plan.duration);
        const price = plan.total_price;

        const registrationUpdated = await registration.update({
            student_id,
            plan_id,
            start_date,
            end_date,
            price,
        });

        return res.json(registrationUpdated);
    }

    async delete(req, res) {
        const { id } = req.params;

        const registration = await Registration.findByPk(id);
        await registration.destroy();

        return res.json();
    }
}

export default new RegistrationController();

import * as Yup from 'yup';
import { parseISO, addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Registration from '../models/Registration';
import Student from '../models/Student';
import Plan from '../models/Plan';
import Mail from '../../lib/Mail';

class RegistrationController {
    async index(req, res) {
        const registrations = await Registration.findAll();

        return res.json(registrations);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number().required(),
            plan_id: Yup.number().required(),
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { student_id, plan_id, start_date } = req.body;

        const plan = await Plan.findByPk(plan_id);

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

        await Mail.sendMail({
            to: `${student.name} <${student.email}>`,
            subject: 'Seja bem-vindo à equipe GymPoint!',
            template: 'welcome',
            context: {
                plan: plan.title,
                start_date: format(
                    startDate,
                    "dd 'de' MMMM 'de' yyyy", // dia 22 de Janeiro, às 09:00h
                    { locale: pt }
                ),
                end_date: format(
                    end_date,
                    "dd 'de' MMMM 'de' yyyy", // dia 22 de Janeiro, às 09:00h
                    { locale: pt }
                ),
                price: `R$${price}`,
            },
        });

        return res.json(registration);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            student_id: Yup.number().required(),
            plan_id: Yup.number().required(),
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

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

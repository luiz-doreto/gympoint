import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class Welcome {
    get key() {
        return 'Welcome';
    }

    async handle({ data }) {
        const { student, plan, start_date, end_date, price } = data;

        await Mail.sendMail({
            to: `${student.name} <${student.email}>`,
            subject: 'Seja bem-vindo à equipe GymPoint!',
            template: 'welcome',
            context: {
                student: student.name,
                plan: plan.title,
                start_date: format(
                    parseISO(start_date),
                    "dd 'de' MMMM 'de' yyyy", // dia 22 de Janeiro, às 09:00h
                    { locale: pt }
                ),
                end_date: format(
                    parseISO(end_date),
                    "dd 'de' MMMM 'de' yyyy", // dia 22 de Janeiro, às 09:00h
                    { locale: pt }
                ),
                price: `R$${price}`,
            },
        });
    }
}

export default new Welcome();

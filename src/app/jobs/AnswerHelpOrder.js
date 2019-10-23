import Mail from '../../lib/Mail';

class AnswerHelpOrder {
    get key() {
        return 'AnswerHelpOrder';
    }

    async handle({ data }) {
        const { helpOrder } = data;
        await Mail.sendMail({
            to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
            subject: '[GymPoint] Sua pergunta foi respondida!',
            template: 'answerHelpOrder',
            context: {
                student: helpOrder.student.name,
                question: helpOrder.question,
                answer: helpOrder.answer,
            },
        });
    }
}

export default new AnswerHelpOrder();

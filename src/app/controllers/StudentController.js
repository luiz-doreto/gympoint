import Student from '../models/Student';
import User from '../models/User';

class StudentController {
    async store(req, res) {
        const { email } = req.body;

        const studentExist = await Student.findOne({ where: { email } });

        if (studentExist) {
            return res.status(401).json({ error: 'Student already exists' });
        }

        const user = await User.findByPk(req.userId);
        if (!user.admin) {
            return res.status(401).json({ error: 'Permission denied' });
        }

        const student = await Student.create(req.body);

        return res.json(student);
    }

    async update(req, res) {
        const { id, email } = req.body;

        const student = await Student.findByPk(id);

        if (email !== student.email) {
            const studentExists = await Student.findOne({ where: { email } });

            if (studentExists) {
                return res
                    .status(401)
                    .json({ error: 'Student already exists' });
            }
        }

        const { name, age, weight, height } = await student.update(req.body);

        return res.json({
            id,
            name,
            email,
            age,
            weight,
            height,
        });
    }
}

export default new StudentController();

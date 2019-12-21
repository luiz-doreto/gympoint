import jwt from 'jsonwebtoken';
import Student from '../models/Student';
import authConfig from '../../config/auth';

class StudentSessionController {
    async store(req, res) {
        const { id } = req.body;

        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(401).json({ error: 'Student does not exists' });
        }

        const { name, email } = student;

        return res.json({
            student: { id, name, email },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new StudentSessionController();

import { Op } from 'sequelize';
import Student from '../models/Student';
import User from '../models/User';
import paginate from '../../util/paginate';

class StudentController {
    async index(req, res) {
        const { filter, page, pageSize } = req.query;
        let students = [];

        if (filter) {
            students = await Student.findAndCountAll({
                attributes: ['id', 'name', 'email', 'age'],
                where: {
                    name: {
                        [Op.iLike]: `${filter}%`,
                    },
                },
                order: ['name'],
                ...paginate(page, pageSize),
            });
        } else {
            students = await Student.findAndCountAll({
                order: ['name'],
                ...paginate(page, pageSize),
            });
        }

        return res.json(students);
    }

    async show(req, res) {
        const { id } = req.params;
        const student = await Student.findOne({ where: { id } });

        return res.json(student);
    }

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

    async delete(req, res) {
        const { id } = req.params;

        const student = await Student.findByPk(id);
        await student.destroy();

        return res.json();
    }
}

export default new StudentController();

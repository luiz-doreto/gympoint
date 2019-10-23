import Sequelize, { Model } from 'sequelize';

class Checkin extends Model {
    static init(sequelize) {
        super.init(
            {
                student_id: Sequelize.INTEGER,
            },
            {
                sequelize,
            }
        );
    }
}

export default Checkin;

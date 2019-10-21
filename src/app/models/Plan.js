import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
    static init(sequelize) {
        super.init(
            {
                title: Sequelize.STRING,
                duration: Sequelize.INTEGER,
                price: Sequelize.STRING,
                total_price: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return this.duration * this.price;
                    },
                },
            },
            {
                sequelize,
            }
        );
    }
}

export default Plan;

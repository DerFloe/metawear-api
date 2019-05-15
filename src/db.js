import Sequelize from 'sequelize';
import _ from 'lodash';

const Conn = new Sequelize(
    'kleidung',
    'root',
    '',
    {
        dialect: 'mysql',
        host: 'localhost'
    }

);

const Item = Conn.define('item', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    },
    color: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

const Season = Conn.define('season', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    }
});
Season.hasMany(Item);
Item.belongsTo(Season);

Conn.sync({force: false});

export default Conn;
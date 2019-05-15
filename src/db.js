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

const Brand = Conn.define('brand', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    }
});

Brand.hasMany(Item);
Item.belongsTo(Brand);

const Store = Conn.define('store', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    },
    logo: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Storelisting = Conn.define('storelisting', {
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    saleprice: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Stock = Conn.define('stock', {
    size: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stockcount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Storelisting.belongsTo(Item);
Item.hasMany(Storelisting);


Stock.belongsTo(Storelisting)
Storelisting.hasMany(Stock)

Storelisting.belongsTo(Store)
Store.hasMany(Storelisting)

Conn.sync({force: true});

export default Conn;
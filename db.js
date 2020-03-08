const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost/noun_db');

const People = conn.define('people', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

const Place = conn.define('places', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

const Things = conn.define('things', {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

People.belongsTo(Place);
Things.belongsTo(People);

const seedAndSync = async () => {
  await conn.sync({ force: true });
  const currentId = await Place.create({ name: 'ny' });
  const currentName = await People.create({
    name: 'joe',
    placeId: currentId.id
  });
  await Things.create({ name: 'apple', personId: currentName.id });
};

module.exports = {
  seedAndSync,
  People,
  Place,
  Things
};

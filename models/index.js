const Sequelize = require("sequelize");
// turn this logging (SQL command text) off using `logging: false`
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

// define a model
const Page = db.define("page", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    // defaultValue: 'This page is empty'
  },
  status: {
    // An ENUM with allowed values 'value 1' and 'value 2'
    type: Sequelize.ENUM("open", "closed"),
    allowNull: false,
  },
});

Page.beforeValidate(async (page) => {
  page.slug = page.title.replace(/\s+/g, "_").replace(/\W/g, "");
});

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
});

module.exports = {
  db,
  Page,
  User,
};

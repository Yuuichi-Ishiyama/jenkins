

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || "local";
const config = require('../config/config.js')(env);

const db = {};

const databases = Object.keys(config.databases);
for (let i = 0; i < databases.length; i += 1) {
  const database = databases[i];
  const dbPath = config.databases[database];
  // console.log(dbPath)
  db[database] = new Sequelize(dbPath);
  //console.log(db[database].config)
  fs.readdirSync(`${__dirname}/${database}`)
    .filter(file => ( 
      file.indexOf('.') !== 0 && file.slice(-3) === '.js'
    ))
    .forEach((file) => {
      const model = db[database]['import'](path.join(`${__dirname}/${database}`, file));
      db[database][model.name] = model;
    });

  Object.keys(db[database]).forEach((modelName) => {
    if (db[database][modelName].associate) {
      db[database][modelName].associate(db[database]);
    }
  });
}

module.exports = db;

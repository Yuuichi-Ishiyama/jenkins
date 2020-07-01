'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  employee.init({
    name: DataTypes.STRING,
    department: DataTypes.STRING,
    gender: DataTypes.STRING,
    birth: DataTypes.DATE,
    joined_date: DataTypes.DATE,
    pay: DataTypes.BIGINT,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'employee',
    underscored: true,
  });
  return employee;
};
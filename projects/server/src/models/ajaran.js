'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ajaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ajaran.hasOne(models.Jenis_bayar)
    }
  }
  Ajaran.init({
    tahun_ajaran: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Ajaran',
  });
  return Ajaran;
};
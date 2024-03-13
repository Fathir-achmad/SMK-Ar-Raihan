'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jenis_bayar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Jenis_bayar.belongsTo(models.Pos_bayar)
      Jenis_bayar.belongsTo(models.Ajaran)
    }
  }
  Jenis_bayar.init({
    pos_bayar: DataTypes.STRING,
    tahun_ajar: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Jenis_bayar',
  });
  return Jenis_bayar;
};
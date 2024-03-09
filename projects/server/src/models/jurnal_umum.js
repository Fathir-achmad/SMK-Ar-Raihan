'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jurnal_umum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Jurnal_umum.init({
    tanggal: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    penerimaan: DataTypes.STRING,
    pengeluaran: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Jurnal_umum',
  });
  return Jurnal_umum;
};
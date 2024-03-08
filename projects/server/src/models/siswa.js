'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Siswa.init({
    nama_siswa: DataTypes.STRING,
    nis: DataTypes.STRING,
    kelamin: DataTypes.STRING,
    agama: DataTypes.STRING,
    kelas: DataTypes.STRING,
    alamat: DataTypes.STRING,
    phone: DataTypes.STRING,
    imgProfile: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    active: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Siswa',
  });
  return Siswa;
};
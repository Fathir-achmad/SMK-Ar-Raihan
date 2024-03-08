const { Sequelize } = require('sequelize');
const db = require('../models');
const siswa = db.Siswa

module.exports = {
    allSiswa: async (req, res) => {
        try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        const filter = {
            status: false, 
        };
        const total = await siswa.count({
            where: filter,
        });
        const result = await siswa.findAll({
            where: filter,
            limit,
            offset
        });
        res.status(200).send({
            totalpage: Math.ceil(total / limit),
            currentpage: page,
            allSiswa: total,
            result,
            status: true
        });
        } catch (err) {
            console.log(err);
            res.status(404).send(err);
        }
    },
    createSiswa : async (req, res) => {
        try {
            const { nama_siswa, nis, kelamin, agama, kelas, alamat, phone, imgProfile, keterangan } = req.body;
            const result = await siswa.findOrCreate({ where : { nis } });
            if (!result[1]) throw {message : "Siswa has already been created"}
            res.status(201).send({
                msg: "Success to create biodata siswa",
                status: true,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    updateKelas: async (req, res) => {
        try {
            const { id } = req.params
            const { nama_siswa, nis, kelamin, agama, kelas, alamat, phone, imgProfile, keterangan } = req.body;
            await siswa.update({
                nama_siswa, 
                nis, kelamin,
                agama, 
                kelas, 
                alamat, 
                phone, 
                imgProfile, 
                keterangan
            },{where: { id }});
            res.status(200).send({
                msg: "Siswa has been updated",
                status: true,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    disableKelas : async(req, res) => {
        try {
            const { id } = req.params
            await siswa.update({
                status: false
            },{where: { id }});
            res.status(200).send({
                status: true,
                msg: 'Success non active kelas!',
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
}
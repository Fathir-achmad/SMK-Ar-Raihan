const { Sequelize } = require('sequelize');
const db = require('../models');
const kelas = db.Kelas

module.exports = {
    allKelas: async (req, res) => {
        try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        const filter = {
            status: false, 
        };
        const total = await kelas.count({
            where: filter,
        });
        const result = await kelas.findAll({
            where: filter,
            limit,
            offset
        });
        res.status(200).send({
            totalpage: Math.ceil(total / limit),
            currentpage: page,
            allKelas: total,
            result,
            status: true
        });
        } catch (err) {
            console.log(err);
            res.status(404).send(err);
        }
    },
    createKelas : async (req, res) => {
        try {
            const { nama_kelas, keterangan } = req.body;
            const result = await kelas.findOrCreate({ where : { nama_kelas } });
            if (!result[1]) throw {message : "Kelas has already been created"}
            res.status(201).send({
                msg: "Success to create kelas",
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
            const { nama_kelas, keterangan } = req.body;
            await kelas.update({
                nama_kelas, 
                keterangan
            },{where: { id }});
            res.status(200).send({
                msg: "Kelas has been updated successfully",
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
            await kelas.update({
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
const { Sequelize } = require('sequelize');
const db = require('../models');
const ajaran = db.Ajaran

module.exports = {
    allTahunAjar: async (req, res) => {
        try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        const filter = {
            status: false, 
        };
        const total = await ajaran.count({
            where: filter,
        });
        const result = await ajaran.findAll({
            where: filter,
            limit,
            offset
        });
        res.status(200).send({
            totalpage: Math.ceil(total / limit),
            currentpage: page,
            tahun_ajaran: total,
            result,
            status: true
        });
        } catch (err) {
            console.log(err);
            res.status(404).send(err);
        }
    },
    createTahunAjar : async (req, res) => {
        try {
            const { tahun_ajaran, keterangan } = req.body;
            const result = await ajaran.findOrCreate({ where : { tahun_ajaran } });
            if (!result[1]) throw {message : "Tahun ajaran has already been created"}
            res.status(201).send({
                msg: "Success to create tahun ajaran",
                status: true,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    updateTahunAjar: async (req, res) => {
        try {
            const { id } = req.params
            const { tahun_ajaran, keterangan } = req.body;
            await ajaran.update({
                tahun_ajaran, 
                keterangan
            },{where: { id }});
            res.status(200).send({
                msg: "Tahun ajaran has been updated successfully",
                status: true,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    disableTahunAjar : async(req, res) => {
        try {
            const { id } = req.params
            await ajaran.update({
                status: false
            },{where: { id }});
            res.status(200).send({
                status: true,
                msg: 'Success non active tahun ajaran!',
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
}
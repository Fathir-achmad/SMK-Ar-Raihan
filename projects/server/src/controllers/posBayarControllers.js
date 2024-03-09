const { Sequelize } = require('sequelize');
const db = require('../models');
const posBayar = db.Pos_bayar;

module.exports = {
    allPosBayar: async (req, res) => {
        try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        const filter = {
            status: false, 
        };
        const total = await posBayar.count({
            where: filter,
        });
        const result = await posBayar.findAll({
            where: filter,
            limit,
            offset
        });
        res.status(200).send({
            totalpage: Math.ceil(total / limit),
            currentpage: page,
            allPos: total,
            result,
            status: true
        });
        } catch (err) {
            console.log(err);
            res.status(404).send(err);
        }
    },
    createPosBayar : async (req, res) => {
        try {
            const { nama, keterangan } = req.body;
            const result = await posBayar.findOrCreate({ where : { nama } });
            if (!result[1]) throw {message : "Jenis pos bayar has already been created"}
            res.status(201).send({
                msg: "Success to create pos bayar",
                status: true,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    updatePosbayar: async (req, res) => {
        try {
            const { id } = req.params
            const { nama, keterangan } = req.body;
            await posBayar.update({
                nama, 
                keterangan
            },{where: { id }});
            res.status(200).send({
                msg: "Pos bayar has been updated successfully",
                status: true,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    disablePosBayar : async(req, res) => {
        try {
            const { id } = req.params
            await posBayar.update({
                status: false
            },{where: { id }});
            res.status(200).send({
                status: true,
                msg: 'Success non active pos bayar!',
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
}
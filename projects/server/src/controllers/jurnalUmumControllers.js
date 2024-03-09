const { Sequelize } = require('sequelize');
const db = require('../models');
const jurnalUmum = db.Jurnal_Umum;

module.exports = {
    allJurnalUmum: async (req, res) => {
        try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        const filter = {
            status: false, 
        };
        const total = await jurnalUmum.count({
            where: filter,
        });
        const result = await jurnalUmum.findAll({
            where: filter,
            limit,
            offset
        });
        res.status(200).send({
            totalpage: Math.ceil(total / limit),
            currentpage: page,
            allJurnal: total,
            result,
            status: true
        });
        } catch (err) {
            console.log(err);
            res.status(404).send(err);
        }
    },
    createJurnalUmum : async (req, res) => {
        try {
            const { tanggal, keterangan, penerimaan, pengeluaran } = req.body;
            const result = await jurnalUmum.create();
            if (!result[1]) throw {message : "Jurnal umum has already been created"}
            res.status(201).send({
                msg: "Success to create jurnal umum",
                status: true,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    updateJurnalUmum: async (req, res) => {
        try {
            const { id } = req.params
            const { tanggal, keterangan, penerimaan, pengeluaran } = req.body;
            await posBayar.update({
                tanggal, 
                keterangan, 
                penerimaan, 
                pengeluaran
            },{where: { id }});
            res.status(200).send({
                msg: "Jurnal umum has been updated successfully",
                status: true,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    disableJurnalUmum : async(req, res) => {
        try {
            const { id } = req.params
            await posBayar.update({
                status: false
            },{where: { id }});
            res.status(200).send({
                status: true,
                msg: 'Success non active jurnal umum!',
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
}
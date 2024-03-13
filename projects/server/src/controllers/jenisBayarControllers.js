const { Sequelize } = require('sequelize');
const db = require('../models');
const jenisBayar = db.Jenis_bayar
const posBayar = db.Pos_bayar
const ajaran = db.Ajaran

module.exports = {
    allJenisBayar: async (req, res) => {
        try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;
        const filter = {
            status: false, 
        };
        const total = await jenisBayar.count({
            where: filter,
        });
        const result = await jenisBayar.findAll({
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
    createJenisbayar : async (req, res) => {
        try {
            const { pos_bayar, tahun_ajar } = req.body;

            const posBayarId = await posBayar.findOne({
                where: {
                    pos_bayar: {
                        [Op.like]: pos_bayar 
                    }
                }
            })
            if (!posBayarId) {
              return res.status(400).send({ message: 'Pos bayar not found' }) 
            };

            const ajaranId = await ajaran.findOne({
                where: {
                    tahun_ajar: {
                        [Op.like]: tahun_ajar 
                    }
                }
            })
            if (!ajaranId) {
              return res.status(400).send({ message: 'Tahun ajar not found' }) 
            };

            const result = await jenisBayar.create({
                posBayar: posBayarId,
                ajaran: ajaranId
            });
            res.status(201).send({
                msg: "Success to create jenis bayar",
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
            const { pos_bayar, tahun_ajar } = req.body;

            const posBayarId = await posBayar.findOne({
                where: {
                    pos_bayar: {
                        [Op.like]: pos_bayar 
                    }
                }
            })
            if (!posBayarId) {
              return res.status(400).send({ message: 'Pos bayar not found' }) 
            };

            const ajaranId = await ajaran.findOne({
                where: {
                    tahun_ajar: {
                        [Op.like]: tahun_ajar 
                    }
                }
            })
            if (!ajaranId) {
              return res.status(400).send({ message: 'Tahun ajar not found' }) 
            };

            const result = await jenisBayar.update({
                posBayar: posBayarId,
                ajaran: ajaranId
            },
            {where: { id }}
            );
            res.status(201).send({
                msg: "Success to update jenis bayar",
                status: true,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    disableJenisBayar : async(req, res) => {
        try {
            const { id } = req.params
            await kelas.update({
                status: false
            },{where: { id }});
            res.status(200).send({
                status: true,
                msg: 'Success non active jenis bayar!',
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err)
        }
    },
}
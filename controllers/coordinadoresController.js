
const { Coordinador } = require("../models");

const bcrypt = require('bcryptjs');

/* Registra un coordinador */
exports.postCoordinador = async (req,res,next) => {
    try {
        const data = req.body
        console.log(data)
        data.password = await bcrypt.hash(data.password, 10)
        const coordinador = await Coordinador.create(data)

        return res.status(200).json({
            ok: true,
            message: "Coordinador registrado correctamente",
            data: coordinador
        });

    } catch(e) {
        console.log(e)
        return res.status(500).json({
            ok: false,
            message: "Algo salio mal"
        });
    }
}
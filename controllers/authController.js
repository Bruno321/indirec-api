require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Coordinador } = require("../models");
const bcrypt = require('bcryptjs');

const tokenKey = process.env.PORT || 'debugKey'

exports.login = async (req,res,next) => {
    try {
        const {email,password} = req.body
        const coordinador = await Coordinador.findOne({where: {email,activo:0}})
        if (!coordinador){
            return res.status(401).json({
                ok: false,
                message: "Usuario o contraseña incorrectos"
            });
        }

        const hashPassword = await bcrypt.compare(password, coordinador.dataValues.password)

        if (!hashPassword) {
            return res.status(401).json({
                ok: false,
                message: "Usuario o contraseña incorrectos"
            });
        }

        const token = jwt.sign(
            {
              "user":coordinador.coordinadorId,
            },
            tokenKey
          );
    
        return res.status(200).json({
            ok: true,
            token: token,
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            ok: false,
            message: "Algo salio mal"
        });
    }
}
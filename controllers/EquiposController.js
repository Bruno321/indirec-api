const moment = require("moment/moment");
const {Equipo} = require("../models");

// Devuelve los equipos
exports.getEquipos = async (req,res,next) => {
    try{
        const equipos = await Equipos.findAll();
        return res.status(200).json({
            ok: true,
            data: equipos
        });
    } catch(e){
        console.log(e);
        return res.status(500).json({
            ok: false,
            message: "Algo salió mal"
        })
    }
}

// Devuelve un equipo

exports.getEquipo = async (req,res,next) => {
    try{
        const{equipoId} = req.params
        const equipo = await Equipo.findOne({where:{equipoId}})
        return res.status(200).json({
            ok: true,
            data: equipo
        });
    } catch(e){
        console.log(e);
        return res.status(500).json({
            ok: false,
            message: "Algo salió mal"
        })
    }
}
// Registrar un Equipo
exports.postEquipo = async(req,res,next) => {
    try{
        const data = req.body;
        console.log(data);
        const equipo = await Equipo.create(data);

        return res.status(200).json({
            ok: true,
            message: "Equipo registrado correctamente",
        })
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            ok: false,
            message: "Algo salió mal al registrar el Equipo"
        });
    }
}

// Actualizar un equipo
exports.putEquipo = async (req,res,next) => {
    const equipoId = req.params.equipoId;
    console.log(equipoId);

    Equipo.update(req.body, {
        where: {equipoId : equipoId}
    }).then(num => {
        if (num == 1) {
          res.send({
            message: "Equipo fue editado correctamente!"
          });
        } else {
          res.send({
            message: `No se ha podido editar el equipo con ID:${equipoId} porque no fue encontrado o req.body está vacio!`
          });
        }
      }).catch(err => {
        res.status(500).send({
          message: "Error actualizando el Equipo con ID:" + id
        });
}
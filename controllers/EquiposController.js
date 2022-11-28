const moment = require("moment/moment");
const { Equipo,Deportista } = require("../models");

// Devuelve los equipos
exports.getEquipos = async (req,res,next) => {
    try{
        const equipos = await Equipo.findAll();

        for (e of equipos) {
            let jugadores = await Deportista.findAll({where:{equipoId:e.equipoId}})

            e.dataValues.jugadores = jugadores?.length ? jugadores : [];
        }
        return res.status(200).json({
            ok: true,
            data: equipos,
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
        const equipo = await Equipo.findOne({where:{equipoId}});

        let jugadores = await Deportista.findAll({where:{equipoId:equipo.equipoId}})

        equipo.dataValues.jugadores = jugadores?.length ? jugadores : [];
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
        const jugadores = data.jugadores
        delete data['jugadores']
        const equipo = await Equipo.create(data);

        let jugadoresQuery = []
        jugadores.forEach( (e)=>{
            let updateData = {equipoId:equipo.equipoId}
            console.log(e)
            jugadoresQuery.push(Deportista.update(updateData,{where:{deportistaId:e}}))
        })

        await Promise.all(jugadoresQuery)
        .then(async (r)=>{
            r.equipoId = equipo.equipoId
            // console.log(r);
        })
        .catch((e)=>{
            console.log(e)
            return res.status(500).json({
                ok: false,
                message: "Algo salió mal al registrar el Equipo"
            });
        })

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
            message: `No existe ese equipo`
            });
        }
        }).catch(err => {
        res.status(500).send({
            message: "Algo salio mal"
        })
    });
}
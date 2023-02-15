const {Evento, Deportista} = require("../models");

/**
 * Devuelve todos los eventos
 */
exports.getEventos = async(req, res) => {
    try{
        const eventos = await Evento.findAll();
        return res.status(200).json({
            ok: true,
            data: eventos
        })
    }catch(e){
        return res.status(500)
    }
}

/**
 * Devuelve un evento por su ID
 * @params ID del evento
 */
exports.getEvento = async(req, res) => {
    try{
        const {eventoId} = req.params;
        const evento = await Evento.findOne({
            include: {
                model: Deportista,
            },
            where: {eventoId}
        });
        
        return res.status(200).json({
            ok: true,
            data: evento
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            ok: false,
            message: "Algo salio mal"
        })
    }
}

/**
 * Registra un evento
 */
exports.postEvento = async (req, res) => {
    try{
        const data = req.body;
        const evento = await Evento.create(data);
        await evento.addDeportista(data.jugadores); //Se agregan los deportistas que formaran parte del evento.

        return res.status(200).json({
            ok: true,
            message: "Evento registrado correctamente",
            data: evento
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            ok: false,
            message: "Algo salio mal"
        })
    }
}
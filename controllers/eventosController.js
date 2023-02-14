const {Evento} = require("../models");

exports.getEvento = async(req, res) => {
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

exports.postEvento = async (req, res) => {
    try{
        const data = req.body;
        const evento = await Evento.create(data);
        
        return res.status(200).json({
            ok: true,
            message: "Evento registrado correctamente",
            data: evento
        })
    }catch(e){
        return res.status(500).json({
            ok: false,
            message: "Algo salio mal"
        })
    }
}
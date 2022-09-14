const { Deportista } = require("../models");

const { imagesService } = require("../services");

/* Devuelve todos los deportistas */
exports.getDeportistas = async (req,res,next) => {
    try {
        const deportistas = Deportista.findAll()
        return res.status(200).json({
            ok: true,
            data: deportistas
        });

    } catch(e) {
        console.log(e)
        return res.status(500).json({
            ok: false,
            message: "Algo salio mal"
        });
    }
}

/* Devuelve un deportista*/
exports.getDeportista = async (req,res,next) => {
    try {
        const {expediente} = req.params
        const deportista = Deportista.findOne({where:{expediente}})
        return res.status(200).json({
            ok: true,
            data: deportista
        });

    } catch(e) {
        console.log(e)
        return res.status(500).json({
            ok: false,
            message: "Algo salio mal"
        });
    }
}


/* Registra un deportista */
exports.postDeportista = async (req,res,next) => {
    try {
        const data = req.body
        const subirImagen = async (imagen) =>{
            // Se intenta subir la imagen
            let response = await imagesService.uploadImage(imagen);
            // Algo salio mal y se le informa al usuaario
            if (!response.ok) {
                return res.status(401).json({
                    ok: false,
                    message: response.message,
                });
            }
            // El path de la imagen
            return response.data
        }

        data.fotoIdentificacionOficial = subirImagen(req.files?.fotoIdentificacionOficial) 
        data.foto = subirImagen(req.files?.foto) 
        data.fotoCardex = subirImagen(req.files?.fotoCardex) 

        const deportista = await Deportista.create(data)

        return res.status(200).json({
            ok: true,
            message: "Deportista registrado correctamente",
            data: deportista
        });

    } catch(e) {
        console.log(e)
        return res.status(500).json({
            ok: false,
            message: "Algo salio mal"
        });
    }
}
const moment = require("moment/moment");
const { Deportista, Asistencia } = require("../models");

const { imagesService } = require("../services");

const { deportistasPdfService } = require("../services/");

/* Devuelve todos los deportistas */
exports.getDeportistas = async (req,res,next) => {
    try {
        const deportistas = await Deportista.findAll()
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
        const deportista = await Deportista.findOne({where:{expediente}})
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

   

        data.fotoIdentificacionOficial = await subirImagen(req.files?.fotoIdentificacionOficial) 
        data.foto = await subirImagen(req.files?.foto) 
        data.fotoCardex = await subirImagen(req.files?.fotoCardex) 

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

/* Genera el PDF dinamico de los deportistas */
exports.getDeportistasPDF = async (req,res,next) => {
    try {
        // TODO con deporte
        const deportistas = await Deportista.findAll()
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            // nombre del equipo
            'Content-Disposition': `attachment;filename=deportistas.pdf`
            
        });
        pdfService.buildPDF(
            (chunk) => stream.write(chunk),
            () => stream.end(),
            deportistas
        )
    } catch(e) {
        console.log(e)
        return res.status(500).json({
            ok: false,
            message: "Algo salio mal"
        });
    }
}

/* Obtiene todas las asistencias */
exports.getAsistencia = async (req,res,next) => {
    try {
        const asistencias = await Asistencia.findAll({
            include: [{ model: Deportista, attributes: ['nombres','apellidos'] }],
        })
        return res.status(200).json({
            ok: true,
            data: asistencias
        });
    } catch(e){
        console.log(e)
        return res.status(500).json({
            ok: false,
            message: "Algo salio mal"
        });
    }
}

/* Registra una asistencia */
exports.postAsistencia = async (req,res,next) => {
    try {
        const {id,fecha} = req.body
        //la Id del deportista sea la del que solicita
        //la fecha sea de hoy, hay que ver en q formato viene la fecha para poder parsearla y compararla
        //usar local time?
        //PARSEAR FECHA
        let parsedFecha = moment(fecha).format('YYYY-MM-DD')
        let parsedDateTime = parsedFecha + ' ' + moment(fecha).format('HH:mm:ss')
        console.log(parsedDateTime)
        const asistencia = await Asistencia.findOne({where:{deportistaId:id,fecha:parsedFecha}})
        //No existe por lo tanto esta registrando hora de entrada y hay que crear el elemento
        if(!asistencia){
            await Asistencia.create({deportistaId:id,horaEntrada:parsedDateTime})
            return res.status(200).json({
                ok: true,
                message:"Hora de entrada registrada correctamente"
            }); 
        }
        //Ya existe por lo tanto esta registrando hora de salida  y hay que editar el elemento
        else {
            if(asistencia.horaSalida===null){
                asistencia.horaSalida = parsedDateTime
                await asistencia.save()
                return res.status(200).json({
                    ok: true,
                    message:"Hora de salida registrada correctamente"
                });
            //Ya fueron registradas las horas posibles
            }else{
                return res.status(400).json({
                    ok: false,
                    message:"La hora de entrada y salida ya fueron registradas"
                });
            }
        }
       
        

    } catch(e){
        console.log(e)
        return res.status(500).json({
            ok: false,
            message: "Algo salio mal"
        });
    }
}
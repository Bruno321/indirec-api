const moment = require("moment/moment");
const { Deportista, Asistencia, Equipo } = require("../models");

const { imagesService } = require("../services");

const { buildPDF } = require("../services/deportistasPdfService");

const Op = require("sequelize").Op;

/* Devuelve todos los deportistas */
exports.getDeportistas = async (req,res,next) => {
    try {
        // Ejemplo de peticion {{url}}/api/deportistas?limit=10&page=1
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page - 1) || 0;
        const pageSize = parseInt(req.query.limit);

        const offset = page * limit;
        
        const deportistas = await Deportista.findAll({where: {}, offset, limit})

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
                throw response.message;
            }
            // El path de la imagen
            return response.data
        }

        data.fotoIdentificacionOficial = await subirImagen(req.files?.fotoIdentificacionOficial);
        data.foto = await subirImagen(req.files?.foto, 'imagen', 'Foto deportista');
        data.fotoCardex = await subirImagen(req.files?.fotoCardex, 'pdf', 'Kardex');

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
            message: `Algo salio mal`
        });
    }
}

/* Genera el PDF dinamico de los deportistas */
exports.getDeportistasPDF = async (req,res,next) => {
    try {
        const {equipoId} = req.params
        let tableData = []
        // TODO con deporte
        const deportistas = await Deportista.findAll({where:{equipoId}})
        const equipo = await Equipo.findOne({where:{equipoId}})
        console.log(deportistas.length)
        deportistas.forEach((e,i)=>{
            console.log(e.nombres)
            console.log(e.apellidos)
            console.log(e.numJugador)
            let object = {
                numberRow: i,
                apellidos:e.apellidos,
                nombres:e.nombres,
                numJugador:e.numJugador
            }
            tableData.push(object)
        })
        console.log(tableData)
        const stream = res.writeHead(200, {
            'Content-Type': 'application/pdf',
            // nombre del equipo
            'Content-Disposition': `attachment;filename=deportistas.pdf`
            
        });
        buildPDF(
            (chunk) => stream.write(chunk),
            () => stream.end(),
            tableData,
            equipo
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
        console.log(req.body)
        const {id,fecha} = req.body;
        //la Id del deportista sea la del que solicita
        //la fecha sea de hoy, hay que ver en q formato viene la fecha para poder parsearla y compararla
        //PARSEAR FECHA
        const parsedFecha = moment(fecha).format('YYYY-MM-DD');
        const parsedDateTime = parsedFecha + ' ' + moment(fecha).format('HH:mm:ss');

        const asistencia = await Asistencia.findOne({
            where:{
                deportistaId:id,
                horaEntrada: {
                    [Op.not]: null
                },
                fecha: parsedFecha,
                horaSalida: null,
            }
        });
        const deportista = await Deportista.findOne({
            where:{
                deportistaId:id
            },
            attributes:['nombres','apellidos','foto']
        });


        //No existe por lo tanto esta registrando hora de entrada y hay que crear el elemento
        if (!asistencia){
            await Asistencia.create({ deportistaId:id,horaEntrada:parsedDateTime })
            return res.status(200).json({
                ok: true,
                message:"Hora de entrada registrada correctamente",
                deportista
            }); 
        }
        //Ya existe por lo tanto esta registrando hora de salida  y hay que editar el elemento
        else {
            if(!asistencia.horaSalida){
                console.log("TODAY ASISTENCIA SALIDA SE SUPONE");
                asistencia.horaSalida = parsedDateTime
                await asistencia.save()
                return res.status(200).json({
                    ok: true,
                    message:"Hora de salida registrada correctamente",
                    deportista
                });
            }
        }

    } catch(e){
        console.log("\n\n\nERROR-->\n\n\n", e);
        return res.status(500).json({
            ok: false,
            message: "Algo salio mal"
        });
    }
}
const { imagesService } = require("../services/")

exports.getImagen = async (req,res,next) => {
    try {
        const { fileName } = req.params;
	    const response = imagesService.getImage(fileName); // Busca la ruta del archivo

        return res.sendFile(response.data);
    } catch(e){
        console.log(e)
        return res.status(500).json({
            ok: false,
            message: "Algo salio mal"
        });
    }
}
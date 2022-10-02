/**
 * Ruta para las acciones sobre un deportista
 * Path: api/deportistas/
 */
 const { Router } = require("express");
 const router = Router();
 const { deportistasController } = require("../controllers");
 const { authorization } = require("../middlewares");

/**
 * Solicita informacion sobre los deportistas
 */
 router.get("/",
	authorization,
	deportistasController.getDeportistas)

/**
 * Registra un deportista
 */
router.post("/",
	authorization,
	deportistasController.postDeportista)

/**
 * Solicita todas las asistencias
 */
 router.get("/asistencias",
	authorization,
	deportistasController.getAsistencia)

/**
 * Registra la asistencia de un deportista
 */
 router.post("/asistencias",
	authorization,
	deportistasController.postAsistencia)
 
/**
 * Solicita informacion sobre un deportista
 */
 router.get("/:expediente",
	authorization,
	deportistasController.getDeportista)

/**
 * Genera el PDF dinamico de los deportistas
 * @TODO por equipo
 */
 router.get("/pdf",
	authorization,
	deportistasController.getDeportistasPDF)

 module.exports = router;
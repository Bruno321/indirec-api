/**
 * Ruta para las acciones sobre un deportista
 * Path: api/uploads/
 */
 const { Router } = require("express");
 const router = Router();
 const { uploadsController } = require("../controllers");
 const { authorization } = require("../middlewares");

/**
 * Regresa un renderizado de la imagen
 */
 router.get("/:fileName",
	// authorization,
	uploadsController.getImagen)

module.exports = router;

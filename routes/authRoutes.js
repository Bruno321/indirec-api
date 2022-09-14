/**
 * Ruta para dar acceso de usuario a los coordinadores
 * Path: api/auth/
 */
const { Router } = require("express");
const router = Router();
const { authController } = require("../controllers");

/**
 * Inicia sesion de un coordinador
 */
router.post("/", authController.login);


module.exports = router;
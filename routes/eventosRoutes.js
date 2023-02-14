/**
 * Ruta para las acciones sobre un evento
 * Path: api/eventos/
 */

const {Router} = require("express");
const router = Router();
const {eventosController} = require("../controllers");
const {authorization} = require("../middlewares");

router.get("/", 
    authorization, 
    eventosController.getEvento);

/**
 * Registra un evento
 */
router.post("/",
    authorization,
    eventosController.postEvento);

module.exports = router;
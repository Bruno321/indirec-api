/**
 * Ruta para las acciones sobre un evento
 * Path: api/eventos/
 */

const {Router} = require("express");
const router = Router();
const {eventosController} = require("../controllers");
const {authorization} = require("../middlewares");

/**
 * Devuelve todos los eventos
 */
router.get("/", 
    authorization, 
    eventosController.getEventos);

/*
* Devuelve un evento 
*/
router.get("/:eventoId", 
    authorization, 
    eventosController.getEvento)

/**
 * Registra un evento
 */
router.post("/",
    authorization,
    eventosController.postEvento);

// Editar/registrar resultados de evento
router.patch("/:eventoId",
authorization,
eventosController.patchEvento
)

module.exports = router;
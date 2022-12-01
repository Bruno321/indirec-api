// Ruta para las acciones sobre el equipo
// Ruta: api/equipos/

const {Router} = require("express");
const router = Router();
const {EquiposController} = require("../controllers");
const {authorization} = require("../middlewares");

// Solicita información sobre los equipos
router.get("/",
authorization,
EquiposController.getEquipos
);

// Solicita información de un equipo
router.get("/:equipoId",
authorization,
EquiposController.getEquipo
);

// Registra un equipo
router.post("/", 
authorization,
EquiposController.postEquipo
)

//Edita un equipo
router.put("/",
authorization,
EquiposController.putEquipo
)

module.exports = router;
/**
 * Router principal con las demás rutas secundarias
 * PATH: /api/
 */
const { Router } = require("express");

const {
	authRoutes,
	deportistasRoutes,
	coordinadoresRoutes,
	uploadsRoutes,
	equipoRoutes,
	eventosRoutes
} = require("./routes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/deportistas", deportistasRoutes);
router.use("/coordinadores", coordinadoresRoutes);
router.use("/uploads", uploadsRoutes);
router.use("/equipos", equipoRoutes);
router.use("/eventos", eventosRoutes);

module.exports = router;
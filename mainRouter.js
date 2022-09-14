/**
 * Router principal con las demás rutas secundarias
 * PATH: /api/
 */
const { Router } = require("express");

const {
	authRoutes,
	deportistasRoutes,
} = require("./routes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/deportistas", deportistasRoutes);

module.exports = router;
const router = require("express").Router();
const userRoutes = require("./user-routes.js");
const courseRoutes = require("./direction-routes.js");

router.use("/users", userRoutes);
router.use("/course", courseRoutes);

module.exports = router;
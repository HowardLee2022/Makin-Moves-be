const express=require('express');
const router = express.Router();

const userRoutes = require('./userController');
router.use("/api/users", userRoutes);

const tripRoutes = require('./tripscontroller');
router.use("/api/trips", tripRoutes);


module.exports = router;
const express=require('express');
const router = express.Router();

const userRoutes = require('./userController');
router.use("/api/users", userRoutes);

const tripRoutes = require('./tripscontroller');
router.use("/api/trips", tripRoutes);

const dayRoutes = require('./dayController');
router.use("/api/day", dayRoutes);


const activitieRoutes = require('./activitiesController');
router.use("/api/activitie", activitieRoutes);


module.exports = router;
const express=require('express');
const router = express.Router();
const {Activities} = require('../models');

router.post("/", (req, res) => {
    Activities.create({
    name:req.body.name,
    DayId:req.body.DayId
    })
      .then((newDay) => {
        res.json(newDay);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Something went wrong when creating activity",
          err,
        });
      });
});

module.exports = router;
const express=require('express');
const router = express.Router();
const {Days, Trips} = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



router.post("/", (req, res) => {
      Days.create({
      DayName:req.body.DayName,
      activities: req.body.activities,
      TripId:req.body.TripId
      })
        .then((newDay) => {
          res.json(newDay);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            msg: "Something went wrong when creating Day",
            err,
          });
        });
  });


  router.get("/:id", (req, res) => {
    Days.findByPk(req.params.id)
      .then((Days) => {
        res.json(Days);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Somethign Went wrong",
        });
      });
  });


  
  

  router.get("/",(req,res)=>{
    Days.findAll().then(userData=>{
     res.json(userData)
    }).catch(err=>{
     console.log(err);
     res.status(500).json({msg:"Cannot get all users!",err})
    })
 })

 router.get("/day/:id",(req,res)=>{
    Days.findAll({
        where:{TripId:req.params.id}
    })
    .then(dayData=>{
     res.json(dayData)
    }).catch(err=>{
     console.log(err);
     res.status(500).json({msg:"Cannot get all users!",err})
    })
 })

  module.exports = router;
const express=require('express');
const router = express.Router();
const {User, Trips} = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// USER SIGN UP
router.post("/", (req, res) => {
    User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    })
      .then((newUser) => {
        const token = jwt.sign(
          {
            username: newUser.username,
            id: newUser.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "3h",
          }
        );
        res.json({
          token,
          user: newUser,
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Error In Creating New User", err });
      });
  });
  // USER LOGGIN ROUTE
  router.post("/login", (req, res) => {
    //1. FIND THE CORRECT USER ROUTE
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((foundUser) => {
        //Wrong email catch
        if (!foundUser) {
          return res.status(401).json({ msg: "Email & Password Does Not Match" });
        }
        //Wrong Email?
        if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
          return res.status(401).json({ msg: "Email & Password Does Not Match" });
        }
        //Email and password are correct at this point
        const token = jwt.sign(
          {
            username: foundUser.username,
            id: foundUser.id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "3h",
          }
        );
        res.json({
          token,
          user: foundUser,
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({ msg: "Error User Loggin", err });
      });
  });
  
  router.post("/addtrip", (req, res) => {
    User.findOne({
      where:{
        email:req.body.email
      }
    })
      .then((user) => {
        user.addTrip(req.body.tripId)
          .then((data) => {
            res.json(data)
          })
  
      })
  });
  


  router.get("/isValidToken", (req, res) => {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(403)
        .json({ isValid: false, msg: "Must Be Loggin!" });
    }
    try {
      const tokenData = jwt.verify(token,process.env.JWT_SECRET);
      res.json({
        isValid: true,
        user: tokenData,
      });
    } catch (err) {
      res.status(403).json({
        isValid: false,
        msg: "Invalid!",
      });
    }
  });

  //GET ALL USERS
router.get("/",(req,res)=>{
    User.findAll(
      {
        include: [
          {
            model: Trips,
            as: "trip"
          },
        ],
      }
    ).then(userData=>{
     res.json(userData)
    }).catch(err=>{
     console.log(err);
     res.status(500).json({msg:"Cannot get all users!",err})
    })
 })

 //GET USERS W/ TRIPS
 router.get("/:id", (req, res) => {
  User.findByPk(req.params.id, {
    include: [
      {
        model: Trips,
        as: "trip"
      },
    ],
  })
    .then((userData) => {
      res.json(userData);
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "oh no", err });
    });
});

 module.exports = router;
const express=require('express');
const router = express.Router();
const {User} = require('../models');
const bcrypt = require("bcrypt");



router.get("/",(req,res)=>{
    User.findAll().then(userData=>{
     res.json(userData)
    }).catch(err=>{
     console.log(err);
     res.status(500).json({msg:"oh noes!",err})
    })
 })

 module.exports = router;
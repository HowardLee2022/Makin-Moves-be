const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const dayjs = require('dayjs')

const { Trips,User, Days } = require('../models');

router.get("/", (req, res) => {
  Trips.findAll({
    include: [
      {
        model: User,
        as: "user"
      },
    ],
  })
    .then((allTrips) => {
      res.json(allTrips);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "Somethign Went wrong",
        err,
      });
  });
})


router.get("/:id", (req, res) => {
  Trips.findByPk(req.params.id,{
      include: [
        {
          model: User,
          as: 'user'
        },
      ]})
    .then((Trips) => {
      res.json(Trips);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "Somethign Went wrong",
        err,
      });
    });
});


router.post("/adduser", (req, res) => {
    Trips.findByPk(req.body.tripId)
    .then((Trips) =>{
      Trips.addUser(req.body.userId)
      .then((data) => {
        res.json(data)
      })
      
    })
});




router.post("/", (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ msg: "Must be logged in to create Trip" });
  }
  const num = (dayjs(req.body.end).diff(dayjs(req.body.start), 'days'))
  const arrayday =[];
  
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    Trips.create({
      title: req.body.title,
      description: req.body.description,
      owner: tokenData.id,
      start: req.body.start,
      end: req.body.end,
      cost: req.body.cost,
    })
      .then((newTrip) => {
        for(i=0; i<num; i++){
          const newObj = {
            DayName: "day " + (i+1),
            TripId: newTrip.id
          }
          arrayday.push(newObj)
        }
        Days.bulkCreate(arrayday)
        newTrip.addUser(tokenData.id)
        .then((data) => {
        res.json(data)
      })  
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Something went wrong when creating Trip",
          err
        });
      });
  } catch (err) {
    return res.status(403).json({ msg: "invalid token" });
  }
});


router.put("/:tripId", (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ msg: "Must be logged in to edit Trip" });
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    Trips.findByPk(req.params.tripId)
      .then((foundTrip) => {
        if (!foundTrip) {
          return res.status(404).json({ msg: "no such Trip" });
        }
        if (foundTrip.owner !== tokenData.id) {
          console.log(foundTrip.owner)
          console.log(tokenData.id)
          return res
            .status(403)
            .json({ msg: "You can only edit trips that's yours" });
        }
        Trips.update(
          {
            title: req.body.title,
            description: req.body.description,
            start: req.body.start,
            end: req.body.end,
            cost: req.body.cost,
          },
          {
            where: {
              id: req.params.tripId,
            },
          }
        ).then((delTrip) => {
          res.json(delTrip);
        }
        ).catch((err) => {
          console.log(err);
          res.status(500).json({
            msg: "Something went wrong with Updating trip",
            err,
          });
        });
      }).catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "Somethign went wrong with finding trip with ID",
          err,
        });
      });
  } catch (err) {
    return res.status(403).json({ msg: "invalid token" });
  }
});

router.delete("/:tripId", (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ msg: "you must be logged in to delete a play!" });
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    Trips.findByPk(req.params.tripId)
      .then((foundTrip) => {
        if (!foundTrip) {
          return res.status(404).json({ msg: "no such Trip!" });
        }
        if (foundTrip.owner !== tokenData.id) {
          return res
            .status(403)
            .json({ msg: "you can only delete trip you created!" });
        }
        Trips.destroy({
          where: {
            id: req.params.tripId,
          },
        })
          .then((delTrip) => {
            res.json(delTrip);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              msg: "womp womp womp",
              err,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "womp womp womp",
          err,
        });
      });
  } catch (err) {
    return res.status(403).json({ msg: "invalid token" });
  }
});



module.exports = router;
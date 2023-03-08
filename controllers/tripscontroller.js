const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Trips } = require('../models');

router.get("/", (req, res) => {
  Trips.findAll()
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
});


router.get("/:id", (req, res) => {
  Trips.findByPk(req.params.id)
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



router.post("/", (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ msg: "Must be logged in to create Trip" });
  }
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    Trips.create({
      title: req.body.title,
      description: req.body.description,
      guest: req.body.guest,
      start: req.body.start,
      end: req.body.end,
      cost: req.body.cost,
      UserId: tokenData.id,
    })
      .then((newTrip) => {
        res.json(newTrip);
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
        if (foundTrip.UserId !== tokenData.id) {
          return res
            .status(403)
            .json({ msg: "You can only edit trips that's yours" });
        }
        Trips.update(
          {
            title: req.body.title,
            description: req.body.description,
            guest: req.body.guest,
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
module.exports = router;
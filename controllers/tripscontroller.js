const express = require('express');
const router = express.Router();

const { Trips } = require('../models');

router.get("/", (req, res) => {
  Trips.findAll()
    .then((allTrips) => {
      res.json(allTrips);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "womp womp womp",
        err,
      });
    });
});




router.post("/", (req, res) => {
  // const token = req.headers?.authorization?.split(" ")[1];
  // if (!token) {
  //   return res
  //     .status(403)
  //     .json({ msg: "you must be logged in to create a play!" });
  // }
  // try {
  //const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  Trips.create({
    title: req.body.title,
    description: req.body.description,
    guest: req.body.guest,
    start: req.body.start,
    end: req.body.end,
    cost: req.body.cost,
    UserId: req.body.UserId,
  })
    .then((newTrip) => {
      res.json(newTrip);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "something didnt work",
        err,
      });
    });
  // } catch (err) {
  //   return res.status(403).json({ msg: "invalid token" });
  // }
});


router.put("/:tripId", (req, res) => {
  // const token = req.headers?.authorization?.split(" ")[1];
  // if (!token) {
  //   return res
  //     .status(403)
  //     .json({ msg: "you must be logged in to edit a play!" });
  // }
  // try {
  // const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  Trips.findByPk(req.params.tripId)
    .then((foundTrip) => {
      if (!foundTrip) {
        return res.status(404).json({ msg: "no such Trip" });
      }
      // if (foundPlay.UserId !== tokenData.id) {
      //   return res
      //     .status(403)
      //     .json({ msg: "you can only edit plays you created!" });
      // }
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
        msg: "uh oh",
        err,
        });
      });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "womp womp womp",
        err,
      });
    });
  // } catch (err) {
  //   return res.status(403).json({ msg: "invalid token" });
  // }
});
module.exports = router;
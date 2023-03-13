const Trips = require("./Trips")
const User = require("./User")
const Days = require("./Days")
const Activities = require("./Activities")

// User.hasMany(Trips);
// Trips.belongsTo(User);

Trips.hasMany(Days);
Days.belongsTo(Trips)

User.belongsToMany(Trips, {
    through: "User_Trip",
    as: "trip",
    foreignKey: "User_id",
  });

Trips.belongsToMany(User, {
    through: "User_Trip",
    as: "user",
    foreignKey: "Trips_id",
});

// Trips.belongsTo(User,{
//     onDelete:"CASCADE",
//     as:'host',
//     foreignKey: {
//         allowNull: false
//     }
// });

// Trips.belongsTo(User,{
//     onDelete:"CASCADE",
//     as:'guest'
// });


// Trips.hasMany(Days)

Days.hasMany(Activities)
Activities.belongsTo(Days)


module.exports ={
    Trips,
    User,
    Activities,
    Days
}
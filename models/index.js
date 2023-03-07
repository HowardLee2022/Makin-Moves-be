const Trips = require("./Trips")
const User = require("./User")
const Days = require("./Days")
const Activities = require("./Activities")


Trips.belongsTo(User,{
    onDelete:"CASCADE",
    as:'host',
    foreignKey: {
        allowNull: false
    }
});

Trips.belongsTo(User,{
    onDelete:"CASCADE",
    as:'guest'
});


Trips.hasMany(Days)

Days.hasMany(Activities)


module.exports ={
    Trips,
    User,
    Activities,
    Days
}
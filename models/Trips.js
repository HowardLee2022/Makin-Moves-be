const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trips extends Model {}

Trips.init({
    title:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    guest: {
         type: DataTypes.STRING,
         allowNull:false,
    },
    start:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        isDate: true,
    },
    end: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        isDate: true,
    },
    cost:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
},{
    sequelize,
});

module.exports=Trips
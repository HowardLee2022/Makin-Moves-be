const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trips extends Model {}

Trips.init({
    days:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    guest: {
         type: DataTypes.STRING,
         allowNull:false,
    },
    start:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[6]
        }
    },
    end: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[6]
        }
    }
},{
    sequelize,
});

module.exports=Trips
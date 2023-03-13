const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Days extends Model {}

Days.init({
    DayName:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
});

module.exports=Days
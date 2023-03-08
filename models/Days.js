const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Days extends Model {}

Days.init({
    DayName:{
        type:DataTypes.STRING,
        allowNull: false
    },
    activities:{
        type: DataTypes.STRING,
        allowNull:true,
    }
},{
    sequelize,
});

module.exports=Days
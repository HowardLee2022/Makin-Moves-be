const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Days extends Model {}

Days.init({
    activities:{
        type: DataTypes.STRING,
        allowNull:true,
    }
},{
    sequelize,
});

module.exports=Days
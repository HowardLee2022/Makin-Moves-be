const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Activities extends Model {}

Activities.init({
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    }
},{
    sequelize,
});

module.exports=Activities
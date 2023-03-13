const express = require('express');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const allRoutes = require('./controllers');
const cors = require("cors");



const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(cors());
app.use(allRoutes);


sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});
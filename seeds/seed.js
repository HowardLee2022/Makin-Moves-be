const sequelize = require("../config/connection");
const {User} = require("../models");

const users = [
  {
    email: "Howard@howard.com",
    password: "password",
    username: "Howardlee",
  },
  {
    email: "Jackie@Jackie.com",
    password: "password",
    username: "Jackielee",
  },
  {
    email: "thien@thien.com",
    password: "password1",
    username: "Thiennguyen",
  },
  {
    email: "nhan@nhan.com",
    password: "password",
    username: "Nhanduong",
  },
];

const seedMe = async () => {
  await sequelize.sync({ force: true });
  const seeedUsers = await User.bulkCreate(users, {
    individualHooks: true,
  });

};

seedMe();
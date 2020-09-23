const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  await knex("users").insert([
    {name: "Test Mom", username:"momma", password: await bcrypt.hashSync("123", 8)},
    {name: "Emilio", username:"Dellrodar", password: await bcrypt.hashSync("123", 8)},
    {name: "Tester", username:"tester", password: await bcrypt.hashSync("123", 8)}
  ])
};

exports.seed = async function(knex) {
  await knex('categories').insert([
    { id: 1, name: "Breakfast" },
    { id: 2, name: "Lunch" },
    { id: 3, name: "Dinner" },
    { id: 4, name: "Brunch" },
    { id: 5, name: "Second Breakfast" },
    { id: 6, name: "Snack" },
    { id: 7, name: "Vegan" },
    { id: 8, name: "Vegetarian" },
  ])
};

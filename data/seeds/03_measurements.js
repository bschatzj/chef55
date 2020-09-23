
exports.seed = async function(knex) {
  await knex('measurements').insert([
    {id: 1, name: "cup"},
    {id: 2, name: "teaspoon"},
    {id: 3, name: "tablespoon"},
    {id: 4, name: "pinch"},
    {id: 5, name: "liter"},
    {id: 6, name: "milliliter"},
    {id: 7, name: "pint"},
    {id: 8, name: "quart"},
    {id: 9, name: "grams"},
    {id: 10, name: "ounces"},
    {id: 11, name: "gallon"},
    {id: 12, name: "pound"},
    {id: 13, name: "kilograms"},
    {id: 14, name: "drops"},
  ])
};


exports.seed = async function(knex) {
  await knex('ingredients').insert([
    {id: 1, name: "Salt"},
    {id: 2, name: "Pepper"},
    {id: 3, name: "Onion"},
    {id: 4, name: "Garlic"},
    {id: 5, name: "Potato"},
    {id: 6, name: "Tomatoes"},
    {id: 7, name: "cheese"},
    {id: 8, name: "garlic powder"},
    {id: 9, name: "red bell pepper"},
    {id: 10, name: "Green Bell Pepper"},
    {id: 11, name: "Ground Turkey"},
    {id: 12, name: "Italian Sausage"},
    {id: 13, name: "egg"},
    {id: 14, name: "Chicken Legs"},
    {id: 15, name: "BBQ Sauce"},
    {id: 16, name: "red pepper flakes"}
  ])
};

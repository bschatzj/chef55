exports.up = async function(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.text("username").notNull().unique();
    table.text('password').notNull()
    table.text('name')
  })
  await knex.schema.createTable( 'categories', (table) => {
    table.increments('id')
    table.text('name').notNull();
  })
  await knex.schema.createTable( 'measurements', (table) => {
    table.increments('id')
    table.text('name').notNull().unique();
   })
  await knex.schema.createTable( 'ingredients', (table) => {
    table.increments('id')
    table.text('name').notNull();
   })
  await knex.schema.createTable( 'recipes', (table) => {
    table.increments('id')
    table.integer('userId')
    .notNull()
    .references('id')
    .inTable('users')
    table.integer('categoryId')
    .notNull()
    .references('id')
    .inTable('categories');
    table.text('title').notNull()
    table.text('source')
    table.text('imgUrl')
    table.text('instructions').notNull()
  })
  await knex.schema.createTable("recipes_ingredients", (table) => {
    table.integer("recipe_id")
           .references("id")
           .inTable("recipes")
           .onDelete("CASCADE")
           .onUpdate('CASCADE'),
    table.integer("ingredient_id")
           .references("id")
           .inTable("ingredients")
           .onDelete("CASCADE")
           .onUpdate('CASCADE'),
    table.integer("measurement_id")
           .references("id")
           .inTable("measurements")
           .onDelete("CASCADE")
           .onUpdate('CASCADE'),
    table.float("quantity").notNull()
    table.primary(["recipe_id","ingredient_id"])
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('recipes_ingredients');
  await knex.schema.dropTableIfExists('recipes');
  await knex.schema.dropTableIfExists('ingredients');
  await knex.schema.dropTableIfExists('measurements');
  await knex.schema.dropTableIfExists('categories');
  await knex.schema.dropTableIfExists('users');
};

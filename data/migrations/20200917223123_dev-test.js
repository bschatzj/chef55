exports.up = async function(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.text("username").notNull().unique();
    table.text('password').notNull()
    table.text('name')
  })
  await knex.schema.createTable( 'category', (table) => {
    table.increments('id')
    table.text('name').notNull().unique();
  })
  await knex.schema.createTable( 'measurement', (table) => {
    table.increments('id')
    table.text('name').notNull().unique();
   })
  await knex.schema.createTable( 'ingredient', (table) => {
    table.increments('id')
    table.text('name')
    table.float('quantity')
    table.integer('measurementId')
    .references('id')
    .inTable('measurement')
    .onUpdate('CASCADE');
   })
  await knex.schema.createTable( 'recipes', (table) => {
    table.increments('id')
    table.text('title').notNull()
    table.text('source')
    table.text('imgUrl')
    table.integer('categoryId')
    .notNull()
    .references('id')
    .inTable('category');
   table.text('ingredients')
   .references('name')
   .inTable('ingredient')
   .notNull()
   table.text('instructions').notNull()
   table.integer('userId')
   .notNull()
   .references('id')
   .inTable('users')
  }
)};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('recipes');
  await knex.schema.dropTableIfExists('ingredient');
  await knex.schema.dropTableIfExists('measurement');
  await knex.schema.dropTableIfExists('category');
  await knex.schema.dropTableIfExists('users');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('dish', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('category').notNullable();
      table.json('ingredients').notNullable(); // Use JSON para armazenar uma lista de ingredientes
      table.decimal('price', 10, 2).notNullable(); // Use decimal para armazenar o preço
      table.text('description').notNullable();
      table.string('image').notNullable();
    });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('dish');
};

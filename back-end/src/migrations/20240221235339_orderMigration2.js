/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('order', function(table) {
        table.increments('id').primary(); 
        table.integer('dishId').unsigned();
        table.foreign('dishId').references('id').inTable('dish');
        table.integer('userId').unsigned();
        table.foreign('userId').references('id').inTable('users');
        table.float('price').notNullable();
        table.float('total').notNullable();
        table.integer('quantity').notNullable();
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('order');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('orderFinish', function(table) {
        table.increments('id').primary(); 
        table.integer('userId').unsigned();
        table.foreign('userId').references('id').inTable('users');
        table.float('price').notNullable();
        table.float('total').notNullable();
        table.enu('status', ['inPayment', 'paymentAccept', 'delivered']).notNullable().defaultTo('inPayment');
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orderFinish');
};

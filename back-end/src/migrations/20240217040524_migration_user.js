/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user', function(table) {
        table.increments('Id');
        table.string('Nome');
        table.string('Email');
        table.string('Senha');
        table.boolean('Admin')
        table.timestamps();
      });
      
      
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user');
};

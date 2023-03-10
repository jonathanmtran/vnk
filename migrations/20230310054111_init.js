/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("queues", function (table) {
      table.uuid("id", { primaryKey: true }).defaultTo(knex.raw("gen_random_uuid()"));
      table.string("queue_name");
      table.dateTime("created").defaultTo(knex.raw('now()'));
    })
    .createTable("queue", function (table) {
      table.uuid("id", { primaryKey: true }).defaultTo(knex.raw("gen_random_uuid()"));
      table.string("queue");
      table.string("name");
      table.string("song_name");
      table.string("youtube_url");
      table.dateTime("created").defaultTo(knex.raw('now()'));
      table.dateTime("performed");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("queues")
    .dropTable("queue");
};

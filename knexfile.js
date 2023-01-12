// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
  migrations: {
    tableName: "knex_migrations",
  },
};

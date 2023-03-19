// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const host = process.env.POSTGRES_HOST;
const user = process.env.POSTGRES_USER ? process.env.POSTGRES_USER : "postgres";
const password = process.env.POSTGRES_PASSWORD;
const db = process.env.POSTGRES_DB ? process.env.POSTGRES_DB : "postgres";

const connectionString =
  "postgresql://" + user + ":" + password + "@" + host + "/" + db;

module.exports = {
  client: "pg",
  connection: connectionString,
  migrations: {
    tableName: "knex_migrations",
  },
};

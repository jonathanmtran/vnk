import knextfile from "../../knexfile";

const db = require("knex")(knextfile);

interface resultSet {
  id: String;
  queue_name: String;
  created: String;
}

export default class QueuesAPI {
  async getQueue(queueId: String) {
    const row = await db('queues')
      .where({
        id: queueId,
      })
      .first();

    if (!row) {
      return undefined;
    }

    return {
      id: row.id,
      name: row.queue_name,
      created: row.created,
    };
  }

  async getQueues() {
    const resultset = await db("queues").select();

    return resultset.map((row: any) => {
      return {
        id: row.id,
        name: row.queue_name,
        created: row.created,
      };
    });
  }

  async createQueue(name: String) {
    let response = {} as resultSet;

    await db("queues")
      .insert(
        {
          queue_name: name,
        },
        ["id", "queue_name", "created"]
      )
      .then(function (row: any) {
        response = row[0];
      });

    return {
      id: response.id,
      name: response.queue_name,
      created: response.created,
    };
  }

  async deleteQueue(queueId: String) {
    const affectedRows = await db("queues")
      .where({
        id: queueId,
      })
      .del();

    return affectedRows;
  }
}

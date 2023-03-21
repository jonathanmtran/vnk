import type { NextApiRequest, NextApiResponse } from "next";
import knextfile from "../../knexfile";

const db = require("knex")(knextfile);

interface resultSet {
  id: String;
  queue_name: String;
}

type createQueueResponse = {
  id: String;
  queueName: String;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    let response;

    await db("queues")
      .select()
      .then(function (rows: any[]) {
        response = rows;
      });

    return res.json({
      queues: response,
    });
  } else if (req.method === "POST") {
    const { name } = req.body;

    let response = {} as resultSet;

    await db("queues")
      .insert(
        {
          queue_name: name,
        },
        ["id", "queue_name"]
      )
      .then(function (row: any) {
        response = row[0];
      });

    const payload: createQueueResponse = {
      id: response.id,
      queueName: response.queue_name,
    };

    return res.json(payload);
  }

  return res.status(501).json({});
}

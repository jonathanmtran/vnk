import { LexoRank } from "lexorank";
import knextfile from "../../knexfile";
import { AddToQueueInput } from "../__generated__/resolvers-types";

const db = require("knex")(knextfile);

export default class QueueAPI {
  async getQueue(id: String) {
    const resultSet = await db("queue")
      .where("queue", id)
      .orderBy([
        { column: "sort", order: "asc" },
        { column: "created", order: "asc" },
      ]);

    return resultSet.map((row: any) => {
      return {
        id: row.id,
        name: row.name,
        songName: row.song_name,
        youTubeUrl: row.youtube_url,
        created: row.created,
        performed: row.performed,
      };
    });
  }

  async addToQueue(args: AddToQueueInput) {
    const { queueId, name, songName, youTubeUrl } = args;

    const sortResultset = await db("queue")
      .select("sort")
      .where("queue", queueId)
      .whereNotNull("sort")
      .orderBy("sort", "desc")
      .first();

    const lexoRank = sortResultset?.sort
      ? LexoRank.parse(sortResultset.sort).genNext()
      : LexoRank.middle();

    const resultset = await db("queue").insert(
      {
        queue: queueId,
        name: name,
        song_name: songName,
        youtube_url: youTubeUrl,
        sort: lexoRank.toString(),
      },
      ["id", "name", "song_name", "youtube_url", "created", "sort"]
    );

    return {
      id: resultset[0].id,
      queueId: queueId,
      name: resultset[0].name,
      songName: resultset[0].song_name,
      youTubeUrl: resultset[0].youtube_url,
      created: resultset[0].created,
    };
  }
}

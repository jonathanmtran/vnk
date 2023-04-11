import { Resolvers } from "./__generated__/resolvers-types";
import knextfile from "../knexfile";

const db = require("knex")(knextfile);

export default {
  Query: {
    queues: async () => {
      const resultset = await db("queues").select();

      return resultset.map((row: any) => {
        return {
          id: row.id,
          name: row.queue_name,
          created: row.created,
        };
      });
    },
    youTubeVideos: async (_, args, { dataSources: { youTubeApi } }) => {
      const { query } = args;

      if (query.trim() === "") {
        return;
      }

      return youTubeApi.search(query);
    },
  },
} as Resolvers;

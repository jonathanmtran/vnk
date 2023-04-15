import { Resolvers } from "../__generated__/resolvers-types";

export default {
  Query: {
    queues: async (_, __, { dataSources: { queuesApi } }) => {
      return queuesApi.getQueues();
    },
    youTubeVideos: async (_, args, { dataSources: { youTubeApi } }) => {
      const { query } = args;

      if (query.trim() === "") {
        return;
      }

      return youTubeApi.search(query);
    },
  },
  Mutation: {
    CreateQueue: async (_, args, { dataSources: { queuesApi } }) => {
      return queuesApi.createQueue(args.input.name);
    },
    DeleteQueue: async (_, args, { dataSources: { queuesApi } }) => {
      if (!args.input.id) {
        return;
      }

      const affectedRows = queuesApi.deleteQueue(args.input.id);

      return {
        affectedRows: affectedRows,
      };
    },
  },
} as Resolvers;

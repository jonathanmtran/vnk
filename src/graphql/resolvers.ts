import { Resolvers } from "../__generated__/resolvers-types";

export default {
  Query: {
    queue: async (_, args, { dataSources: { queueApi, queuesApi } }) => {
      if (!args.id) {
        return;
      }

      const queueMeta = await queuesApi.getQueue(args.id);

      return {
        ...queueMeta[0],
        queue: queueApi.getQueue(args.id),
      };
    },
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
    AddToQueue: async (_, args, { dataSources: { queueApi } }) => {
      return queueApi.addToQueue(args.input);
    },
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
    DeleteQueueEntry: async (_, args, { dataSources: { queueApi } }) => {
      return { affectedRows: queueApi.delete(args.input) };
    },
    UpdateQueueEntry: async (_, args, { dataSources: { queueApi } }) => {
      return queueApi.update(args.input);
    },
  },
} as Resolvers;

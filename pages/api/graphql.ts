import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { readFileSync } from "fs";
import { NextRequest } from "next/server";
import QueuesAPI from "../../src/graphql/queuesAPI";
import resolvers from "../../src/graphql/resolvers";
import { YouTubeAPI } from "../../src/youTubeAPI";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

export interface MyContext {
  dataSources: {
    queuesApi: QueuesAPI;
    youTubeApi: YouTubeAPI;
  };
}

const server = new ApolloServer<MyContext>({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler<NextRequest, MyContext>(server, {
  context: async () => {
    return {
      dataSources: {
        queuesApi: new QueuesAPI(),
        youTubeApi: new YouTubeAPI(),
      },
    };
  },
});

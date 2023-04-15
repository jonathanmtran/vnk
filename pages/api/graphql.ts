import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { readFileSync } from "fs";
import { NextRequest } from "next/server";
import resolvers from "../../src/resolvers";
import { YouTubeAPI } from "../../src/youTubeAPI";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

export interface MyContext {
  dataSources: {
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
        youTubeApi: new YouTubeAPI(),
      },
    };
  },
});

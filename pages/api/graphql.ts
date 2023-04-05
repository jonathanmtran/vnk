import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { readFileSync } from 'fs';
import { NextRequest } from 'next/server';
import knextfile from "../../knexfile";
import { Resolvers } from '../../src/__generated__/resolvers-types';

const db = require("knex")(knextfile);

const resolvers: Resolvers = {
  Query: {
    queues: async () => {
      const resultset = await db("queues")
        .select();

      return resultset.map((row: any) => {
        return {
          id: row.id,
          name: row.queue_name,
          created: row.created,
        }
      });
    }
  },
};

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler<NextRequest>(server, {
  context: async req => ({ req })
});

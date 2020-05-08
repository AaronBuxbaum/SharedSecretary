import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { ApolloServer, gql, IResolvers } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
  }
`;

const resolvers: IResolvers = {
  Query: {
    users: ({ connection }) => connection.manager.find(User),
  },
};

async function main() {
  const connection = await createConnection();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { connection },
  });
  const url = await server.listen(4000);
  console.log(`🚀  Server ready at ${url}`);
}

main();

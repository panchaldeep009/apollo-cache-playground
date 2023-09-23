import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();

export const client = new ApolloClient({
  uri: "http://localhost:8383/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "myadminsecretkey",
  },
  cache,
});

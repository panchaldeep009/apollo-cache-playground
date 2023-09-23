import { ApolloClient, InMemoryCache } from "@apollo/client";

class CacheOverrides extends InMemoryCache {}

export const client = new ApolloClient({
  uri: "http://localhost:8383/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "myadminsecretkey",
  },
  cache: new CacheOverrides({
    // dataIdFromObject: (object) => {
    //   console.log("dataIdFromObject", object);
    //   return undefined;
    // },
  }),
});

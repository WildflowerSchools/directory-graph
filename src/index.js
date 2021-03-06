const express = require("express")
const { ApolloServer, gql } = require("apollo-server-express")
const { schema } = require("./schema")
const voyager = require("graphql-voyager/middleware")
const beehive = require("@wildflowerschools/graphql-beehive")

const server = new ApolloServer({
  schema,
  formatError: error => {
    // console.log(error);
    return error
  },
  formatResponse: response => {
    // console.log(response);
    return response
  }
})

const app = express()

app.use("/voyager", voyager.express({ endpointUrl: "/graphql" }))

server.applyMiddleware({ app })
;(async () => {
  console.log("checking database")
  try {
    console.log(beehive)
    await beehive.ensureDatabase(schema)
    console.log("database checked")
    app.listen({ port: 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    )
  } catch (e) {
    console.log(e)
  }
})()

import express from 'express'
import { buildSchema } from "type-graphql";
import { NoteResolver } from "./NoteResolver";
import { context } from "./context";

var { createHandler } = require("graphql-http/lib/use/express")
var { ruruHTML } = require("ruru/server")
 
const app = async () => {
  // Construct a schema, using GraphQL schema language
  var schema = await buildSchema({
    resolvers: [NoteResolver]
  })
  
  var server = express()
  
  // Create and use the GraphQL handler.
  server.all(
    "/api/graphql",
    createHandler({
      schema: schema,
      context: context
    })
  )
  
  // Serve the GraphiQL IDE.
  server.get("/api", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/api/graphql" }))
  })
  
  // Start the server at port
  server.listen(4000)
  console.log("Running a GraphQL API server at http://localhost:4000/api/graphql")
}

app()

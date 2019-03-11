const addresses = require("./addresses")
const journey = require("./journey")
const schools = require("./schools")
const persons = require("./persons")
const { makeExecutableSchema } = require("graphql-tools")
const {
  BeehiveDirectives,
  BeehiveTypeDefs
} = require("@wildflowerschools/graphql-beehive")

const rootDefs = `
  type Query {
    schools(envId: String, page: PaginationInput): SchoolList! @beehiveList(target_type_name: "School")
    people(envId: String, page: PaginationInput): PersonList! @beehiveList(target_type_name: "Person")
  }

  type Mutation {
    # adds a new device to the graph
    createSchool(school: SchoolInput): School @beehiveCreate(target_type_name: "School")
    createPerson(person: PersonInput): Person @beehiveCreate(target_type_name: "Person")
  }

  schema @beehive(schema_name: "directory") {
    query: Query
    mutation: Mutation
  }
`

const logger = { log: e => console.log(e) }

const schema = makeExecutableSchema({
  typeDefs: [
    rootDefs,
    BeehiveTypeDefs,
    addresses.typeDefs,
    journey.typeDefs,
    schools.typeDefs,
    persons.typeDefs
  ],
  schemaDirectives: BeehiveDirectives,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  logger: logger
})

exports.schema = schema

const schools = require("./schools");
const persons = require("./persons")
const {makeExecutableSchema} = require('graphql-tools');
const {BeehiveDirectives, BeehiveTypeDefs} = require("@wildflowerschools/graphql-beehive")


const rootDefs = `
  type Query {
    schools(envId: String, page: PaginationInput): SchoolList! @beehiveList(target_type_name: "School")
  }

  type Mutation {
    # adds a new device to the graph
    createSchool(school: SchoolInput): School @beehiveCreate(target_type_name: "School")
  }

  schema @beehive(schema_name: "directory") {
    query: Query
    mutation: Mutation
  }

`;

const logger = { log: e => console.log(e) }
  
const schema = makeExecutableSchema({
  typeDefs: [
    rootDefs,
    BeehiveTypeDefs,
    schools.typeDefs,
    persons.typeDefs,
  ],
  schemaDirectives: BeehiveDirectives,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  logger: logger,
});

exports.schema = schema;

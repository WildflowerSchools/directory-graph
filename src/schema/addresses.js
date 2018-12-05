exports.typeDefs = `
  type Address @beehiveTable(table_name: "addresses", pk_column: "address_id") {
    # Internal identifier for the address
    address_id: ID!
    line_1: String
    line_2: String
    line_3: String
    city: String!
    state: String
    postal_code: String
    country: String!
  }
`;
exports.typeDefs = `

  # A School within the network
  type School @beehiveTable(table_name: "schools", pk_column: "school_id") {
    # Internal identifier for the school
    school_id: ID!
    # The name of the school
    name: String
    # Description of the school.
    description: String
    # Location
    location: Address @beehiveRelation(target_type_name: "Address")
    # current state of the school
    state: SchoolState!
  }

  type SchoolList {
    data: [School!]
  }

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
  
  input SchoolInput {
    name: String
    description: String
    location: String
    state: SchoolState!
  }

  enum SchoolState {
    IN_PROGRESS
    OPEN
    CLOSED
    LEFT_NETWORK
    INACTIVE
  }

`;

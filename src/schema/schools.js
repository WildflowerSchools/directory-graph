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
    # School Journey
    school_journey: SchoolJourney @beehiveRelation(target_type_name: "SchoolJourney")
  }

  type SchoolList {
    data: [School!]
  }
  
  input SchoolInput {
    name: String
    description: String
    location: ID
    state: SchoolState!
  }

  enum SchoolState {
    # School in any phase of the startup journey prior to opening
    IN_STARTUP_JOURNEY
    # School has "graduated" from the startup journey and has opened
    OPEN
    # School has closed their doors and no longer accepting students or the school has left the Wildflower Network of schools
    CLOSED
  }
`

exports.typeDefs = `

  # A Person within the network, could be support staff, school staff, current students or past students
  type Person @beehiveTable(table_name: "persons", pk_column: "person_id") {
    # Internal identifier for the person
    person_id: ID!
    # The name of the person
    name: String
    # Address on file for the person
    location: Address @beehiveRelation(target_type_name: "Address")
    # Current active/inactive state of the person within the network
    active: Boolean
    roles: [SchoolAssignmentRole!] @beehiveRelation(target_type_name: "SchoolAssignmentRole", target_field_name: "person")
  }


  input PersonInput {
    name: String
    location: ID
    active: Boolean
  }

  type SchoolAssignmentRole @beehiveTable(table_name: "sa_roles", pk_column: "sa_role_id") {
    sa_role_id: ID!
    type: SchoolAssignmentRoleType!
    start: String! # @beehiveUTCDate
    end: String # @beehiveUTCDate
    school: School! @beehiveRelation(target_type_name: "School")
    person: Person! @beehiveRelation(target_type_name: "Person")
  }

  enum SchoolAssignmentRoleType {
    STUDENT
    TEACHER
    ADMINISTRATOR
    SUPPORT
  }

`;

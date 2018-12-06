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
    # Collection of roles Person holds at Schools
    school_roles: [SchoolAssignmentRole!] @beehiveRelation(target_type_name: "SchoolAssignmentRole", target_field_name: "person")
    # GSuite ID
    gsuite_id: String
    # GSuite profile
    # external_email - derived from GSuite, there is a field in GSuite that records a user's personal email, this is what should be used if the user's wf email is part of the wildflowerfriends domain
    # wf_email - derived from GSuite
    # preferred_email - synthetic field, simple logic that uses wf_email if domain is not wildflowerfriends, otherwise uses external_email
    # Personal Email
    # emails: [Email]
    # Phone Number
    phones: [PhoneNumber]
    # Birthday
    birthday: Datetime  # @beehiveUTCDate
    # Public Bio
    public_bio: String
    # Personal Bio
    personal_bio: String
    # Social Media
    socials: [Social] @beehiveRelation(target_type_name: "Social")
    # Websites
    websites: [Website] @beehiveRelation(target_type_name: "Website")
    # Montessori Credentials (AMI/AMS/other) + year + institution (string)
    montessori_credentials: [MontessoriCredential] @beehiveRelation(target_type_name: "MontessoriCredential")
    # Race/Ethnicity (refer to survey)
    race_ethnicity: [RaceEthnicity] @beehiveRelation(target_type_name: "RaceEthnicity")
    race_ethnicity_other: String
    # Identify as POC (boolean)
    person_of_color: Boolean
    # Income Background 
    income_background: IncomeBackground
    # Language
    language: [Language]
    language_other: String
    # Gender
    gender: Gender
    gender_other: String
  }
  
  type SchoolAssignmentRole @beehiveTable(table_name: "sa_roles", pk_column: "sa_role_id") {
    sa_role_id: ID!
    type: SchoolAssignmentRoleType!
    start: Datetime!  # @beehiveUTCDate
    end: Datetime  # @beehiveUTCDate
    school: School! @beehiveRelation(target_type_name: "School")
    person: Person! @beehiveRelation(target_type_name: "Person")
  }

  enum SchoolAssignmentRoleType {
    STUDENT
    TEACHER
    ADMINISTRATOR
    BOARD_MEMBER
    SUPPORT
  }
  
  type Social @beehiveTable(table_name: "socials", pk_column: "social_id") {
    social_id: ID!
    url: String
    type: SocialType!
  }
  
  enum SocialType {
    LINKED_IN
    TWITTER
    FACEBOOK
    YOUTUBE
    INSTAGRAM
    QUORA
    FOURSQUARE
  }
  
  type Website @beehiveTable(table_name: "websites", pk_column: "website_id") {
    website_id: ID!
    url: String
    type: WebsiteType!
  }
  
  enum WebsiteType {
    HOME
    WORK
    OTHER
  }
  
  type PhoneNumber @beehiveTable(table_name: "phone_numbers", pk_column: "phone_number_id") {
    phone_number_id: ID!
    number: String
    type: PhoneType!
  }
  
  enum PhoneType {
    HOME
    WORK
    OTHER
  }

  input PersonInput {
    name: String
    location: ID
    active: Boolean
  }
  
  type MontessoriCredential @beehiveTable(table_name: "montessori_credentials", pk_column: "montessori_credential_id") {
    year: Int!
    institution: String!
    certifying_body: MontessoriCertifyingBody!
    type_other: String
    level: [MontessoriLevel]
  }
  
  enum MontessoriCertifyingBody {
    AMI  # Association Montessori Internationale
    AMS  # American Montessori Society
    OTHER
  }
  
  enum MontessoriLevel {
    ASSISTANTS_TO_INFANCY
    PRIMARY
    ELEMENTARY
    ADOLESCENT
  }
  
  enum RaceEthnicity {
    BLACK  # African-American, Afro-Caribbean or Black
    NATIVE_AMERICAN  # Native American or Alaska Native
    HISPANIC  # Hispanic, Latinx, or Spanish Origin
    ASIAN  # Asian-American
    MENA  # Middle Eastern or North African
    NATIVE_HAWAIIAN  # Native Hawaiian or Other Pacific Islander
    WHITE  # White
    OTHER  # A not-listed or more specific race or ethnicity
  }
  
  enum IncomeBackground {
    LOW
    MIDDLE
    HIGH
  }
  
  enum Language {
    ARABIC
    ARMENIAN
    BANTU  # Bantu (Including Swahili)
    BEGALI
    CANTONESE
    ENGLISH
    FRENCH
    GERMAN
    GREEK
    GUJARATI
    HAITIAN_CREOLE
    HEBREW
    HINDI
    HMONG
    ITALIAN
    JAPANESE
    KHMER
    KOREAN
    MANDARIN
    NAVAJO
    PERSIAN  # Persian (including Farsi and Dari)
    DARI
    POLISH
    PORTUGUESE
    PUNJABI
    RUSSIAN
    SERBO_CROATI  # Serbo-Croatian (including Bosnian, Croatian, Montenegrin and Serbian)
    SPANISH
    TAGALOG
    TAI_KADAI  # Tai-Kadai (including Thai and Lao)
    TAMI
    TELUGU
    URDU
    VIETNAMESE
    OTHER  # A not-listed or more specific language
  }
  
  enum Gender {
    MALE
    FEMALE
    NON_BINARY
    OTHER  # A not-listed or more specific gender
  }
`;

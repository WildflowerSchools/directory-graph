exports.typeDefs = `
  type TLJourney @beehiveTable(table_name: "tl_journeys", pk_column: "tl_journey_id") {
    # teacher leader
    teacher: Person! @beehiveRelation(target_type_name: "Person")
    # current state within the TL Journey
    stage: [TLJourneyStage!] @beehiveRelation(target_type_name: "TLJourneyStage")
    # TLJourney Checklist
    # checklist: [TLJourneyChecklist!]
    state: JourneyState
    state_reason: String
  }
  
  type TLJourneyStage @beehiveTable(table_name: "tl_journey_stages", pk_column: "tl_journey_stage_id") {
    tl_journey_stage_id: ID!
    type: TLJourneyStageType!
    start: Datetime! # @beehiveUTCDate
    end: Datetime # @beehiveUTCDate
  }
  
  enum TLJourneyStageType {
    PASSIVE_EXPLORATION
    EXPLORATION
    EXPLORATION_TRANSITION
    PLANNING
  }
  
  enum JourneyState {
    ACTIVE
    COMPLETE
    PAUSE
    ABANDONED
  }
  
  # type TLJourneyChecklist {
  #   school_type: (charter/public/private)
  #   state: (MN/WI/etc)
  #   started: Datetime! # @beehiveUTCDate
  #   end: Datetime # @beehiveUTCDate
  #   tl_stage: TLJourneyStageType
  #   
  #   app_maker_application: ID (extract information)
  #   document: BLOB
  #   freeform_text: String
  # }
  
  type SchoolJourney @beehiveTable(table_name: "school_journeys", pk_column: "school_journey_id") {
    # school
    school: School! @beehiveRelation(target_type_name: "School")
    # teacher leaders
    teachers: [Person!] @beehiveRelation(target_type_name: "Person")
    # current state within the School Journey
    stage: [SchoolJourneyStage!] @beehiveRelation(target_type_name: "SchoolJourneyStage")
    state: JourneyState
    state_reason: String
  }
  
  type SchoolJourneyStage @beehiveTable(table_name: "school_journey_stages", pk_column: "school_journey_stage_id") {
    school_journey_stage_id: ID!
    type: SchoolJourneyStageType!
    start: Datetime! # @beehiveUTCDate
    end: Datetime # @beehiveUTCDate
  }
  
  enum SchoolJourneyStageType {
    PRE_PLANNING
    PLANNING
    PLANNING_TRANSITION
    STARTUP
    OPEN
  }
  
`;

// exploration - who, what, why

//  - pause for advice - vision alignment

// planning - find you partner, journeys can be both combined and individual

//  - pause for advice

//  more planning

//  - pause for advice and sign agreement(s)

// startup - get funds, find location, sign leases, get systems, open bank account, get insurance


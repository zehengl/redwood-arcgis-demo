import gql from 'graphql-tag'

export const schema = gql`
  type Location {
    id: String!
    address: String!
    description: String
  }

  type Query {
    locations: [Location!]!
    location(id: String!): Location!
  }

  input CreateLocationInput {
    id: String!
    address: String!
    description: String
  }

  input UpdateLocationInput {
    id: String!
    address: String
    description: String
  }

  type Mutation {
    createLocation(input: CreateLocationInput!): Location!
    updateLocation(id: String!, input: UpdateLocationInput!): Location!
    deleteLocation(id: String!): Location!
  }
`

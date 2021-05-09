import { gql } from 'apollo-server-express';
export const typeDefs = gql`
    type Query {
        ping: String!
        cats: [Cat!]!
        dogs: [Dog!]!
        groups: [Group!]!
    },
    type Cat {
        _id: ID!
        name: String!
    }
    type Dog {
        _id: ID!
        breed: String!
    }
    type Group {
        _id: ID!
        userId: String!
        name: String!
        groupType: String!
    }
    type Mutation {
        createCat(name: String!): Cat!
        createDog(breed: String!): Dog!
        createGroup(
            userId: String!
            name: String!
            groupType: String!
        ): Group!
    }
`;
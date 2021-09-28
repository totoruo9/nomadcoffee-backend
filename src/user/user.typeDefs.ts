import { gql } from "apollo-server";

export default gql`
    type User {
        id: Int!
        email: String!
        name: String
    }

    type Query {
        seeUser: [User]
    }
`;
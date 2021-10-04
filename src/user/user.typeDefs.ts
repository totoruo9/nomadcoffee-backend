import { gql } from "apollo-server";

export default gql`
    scalar Upload

    type User {
        id: Int
        username: String
        email: String
        name: String
        location: String
        password: String
        avatarURL: String
        githubUsername: String
        followers(page:Int!): [User]
        following(page:Int!): [User]
        updateAt: String
        createAt: String
    }

    type Query {
        seeUser: [User]
    }

    type CommonResult {
        ok: Boolean!,
        error: String,
        token: String
    }
`;
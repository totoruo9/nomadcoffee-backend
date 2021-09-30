import { gql } from "apollo-server";

export default gql`
    type User {
        id: Int
        username: String
        email: String
        name: String
        location: String
        password: String
        avatarURL: String
        githubUsername: String
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
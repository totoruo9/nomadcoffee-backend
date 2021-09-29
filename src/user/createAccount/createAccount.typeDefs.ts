import { gql } from "apollo-server";

export default gql`
    type CreateAccountResponse {
        ok: Boolean!,
        error: String
    }

    type Mutation {
        createAccount(
            id: Int,
            username: String!,
            email: String!,
            name: String!,
            location: String,
            password: String!,
            avatarURL: String,
            githubUsername: String,
            createAt: String,
            updateAt: String
        ):CreateAccountResponse
    }
`;
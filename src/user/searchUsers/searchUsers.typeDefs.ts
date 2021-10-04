import { gql } from "apollo-server";

export default gql`
    type Mutation {
        searchUsers(keyword:String!, cursor:Int!):[User]
    }
`;
import { gql } from "apollo-server";

export default gql`
    type Mutation {
        createCoffeeShop(
            name: String,
            latitude: String,
            longitude: String,
            user: String,
            photos: String,
            categories: String
        ):CommonResult
    }
`;
import { Resolvers } from "../types";

const CoffeeResolver:Resolvers = {
    Category: {
        totalShop: ({id}) => {
            console.log(id)
        }
    }
}
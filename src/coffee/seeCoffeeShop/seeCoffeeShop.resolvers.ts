import client from "../../client";
import { Resolvers } from "../../types";

const SeeCoffeeShopResolvers:Resolvers = {
    Query: {
        seeCoffeeShop: async (_,{id}) => {
            const coffeeShop = await client.coffeeShop.findUnique({
                where:{id}
            });
            return coffeeShop
        }
    }
}

export default SeeCoffeeShopResolvers;
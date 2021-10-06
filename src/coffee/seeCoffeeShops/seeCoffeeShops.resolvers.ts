import client from "../../client";
import { Resolvers } from "../../types";

const SeeCoffeeShops:Resolvers = {
    Query: {
        seeCoffeeShops: async (_,{page}) => {
            const coffeeShops = await client.coffeeShop.findMany({
                select:{
                    id:true,
                    name: true,
                    latitude: true,
                    longitude: true,
                    user: true,
                    photos: true,
                    categories: true
                },
                take:5,
                skip: (page-1)*5
            });
            return coffeeShops;
        }
    }
}

export default SeeCoffeeShops;
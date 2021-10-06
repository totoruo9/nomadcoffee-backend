import client from "../../client";
import {createWriteStream} from "fs";
import { Resolvers } from "../../types";
import { protectedResolvers } from "../../user/user.utils";
import { processHashtags } from "../coffee.utils";

const CreateCoffeeShopResolvers:Resolvers = {
    Mutation: {
        createCoffeeShop: protectedResolvers(
            async (_,{
                name,
                latitude,
                longitude,
                photos,
                categories
            }, {isLoggedIn}) => {
                let categoriesObj:any = [];
                if(categories){
                    categoriesObj = processHashtags(categories);
                };

                let photo = null;
                if(photos){
                    const {createReadStream, filename} = await photos;
                    const newFilename = `${name}-${Date.now()}-${filename}`;
                    const readStream = await createReadStream(`${process.cwd()}/uploads/${newFilename}`);
                    const writeStream = createWriteStream(`${process.cwd()}/uploads/${newFilename}`);
                    readStream.pipe(writeStream);
                    photo = `http://localhost:4000/:4000/static/${newFilename}`;
                }

                return client.coffeeShop.create({
                    data:{
                        name,
                        latitude,
                        longitude,
                        user: {
                            connect: {
                                id: isLoggedIn.id
                            }
                        },
                    ...(categoriesObj.length > 0 && {
                        categories: {
                            connectOrCreate: categoriesObj
                        }
                    })
                    }
                })
            }
        )
    }
}

export default CreateCoffeeShopResolvers;
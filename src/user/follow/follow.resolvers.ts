import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolvers } from "../user.utils";

const FollowResolvers:Resolvers = {
    Mutation: {
        follow: protectedResolvers(
            async (_,{username}, {isLoggedIn}) =>{
                const checkUser = await client.user.findFirst({
                    where:{username},
                    select:{
                        id:true
                    }
                });
                if(!checkUser){
                    return {
                        ok: false,
                        error: `${username} is not found`
                    }
                }
                await client.user.update({
                    where:{
                        id: isLoggedIn.id
                    },
                    data:{
                        following: {
                            connect: {
                                username
                            }
                        }
                    }
                })
                return {
                    ok: true
                }
            }
        )
    }
}

export default FollowResolvers;
import client from "../../client";
import { Resolvers } from "../../types";
import { protectedResolvers } from "../user.utils";

const UnfollowResolvers:Resolvers = {
    Mutation: {
        unfollow: protectedResolvers(
            async(_,{username}, {isLoggedIn}) => {
                const checkUser = await client.user.findFirst({
                    where:{username},
                    select:{id:true}
                });
                if(!checkUser){
                    return{
                        ok: false,
                        error: `${username} not Found.`
                    }
                };
                console.log(checkUser);
                await client.user.update({
                    where:{
                        id:isLoggedIn.id
                    },
                    data:{
                        following:{
                            disconnect:{username}
                        }
                    }
                })
                return {
                    ok:true
                }
            }
        )
    }
}

export default UnfollowResolvers;
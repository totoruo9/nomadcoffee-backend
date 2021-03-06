import client from "../../client";
import { Resolvers } from "../../types";

const SeeProfileResolvers:Resolvers = {
    Query: {
        seeProfile: async (_,{username}) => {
            try{
                const findUser = await client.user.findUnique({
                    where:{
                        username
                    },
                    include:{
                        followers: true,
                        following: true
                    }
                });
    
                return findUser;
            } catch {
                return null
            }
        }
    }
}

export default SeeProfileResolvers;
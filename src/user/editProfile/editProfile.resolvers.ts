import client from "../../client";
import { Resolvers } from "../../types";
import bcrypt from "bcrypt";
import { protectedResolvers } from "../user.utils";

const EditPropfileResolvers:Resolvers = {
    Mutation: {
        editProfile: protectedResolvers(
            async (_,{
                username,
                email,
                name,
                location,
                password,
                avatarURL,
                githubUsername
            }, {isLoggedIn}) => {
                const user = isLoggedIn;
                if(!user) {
                    return {
                        ok: false,
                        error: "You need to login first"
                    }
                }
    
                let hashPassword  = null;
                if(password){
                    hashPassword = await bcrypt.hash(password, 10);
                }
                
                await client.user.updateMany({
                    where:{
                        id: isLoggedIn.id
                    },
                    data:{
                        username,
                        email,
                        name,
                        location,
                        ...(password && {password:hashPassword}),
                        avatarURL,
                        githubUsername
                    }
                });
    
                return {
                    ok: true
                }
            }
        )
    }
}

export default EditPropfileResolvers;
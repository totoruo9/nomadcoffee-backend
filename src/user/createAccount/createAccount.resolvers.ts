import client from "../../client";
import {Resolvers} from "../../types";
import bcrypt from "bcrypt";

const CreateAccountResolver:Resolvers = {
    Mutation: {
        createAccount: async(_, {
            username,
            email,
            name,
            location,
            password,
            avatarURL,
            githubUsername
        }) => {
            try {
                if(!username){
                    return {
                        ok: false,
                        error: "Please insert username"
                    }
                };
                if(!email){
                    return {
                        ok: false,
                        error: "Please insert email"
                    }
                };
                if(!password){
                    return {
                        ok: false,
                        error: "Please insert password"
                    }
                };

                const user = await client.user.findFirst({
                    where: {
                        OR:[{username}, {email}, {githubUsername}]
                    },
                    select:{id:true}
                });

                if(user){
                    return {
                        ok:false,
                        error:"Exisit this user"
                    }
                };

                const hashPassword = await bcrypt.hash(password, 10);
                
                await client.user.create({
                    data: {
                        username,
                        email,
                        name,
                        location,
                        password:hashPassword,
                        avatarURL,
                        githubUsername
                    }
                });
    
                return {
                    ok: true
                }
            } catch {
                return {
                    ok: false,
                    error: "Fail to Create account"
                }
            }

            
        }
    }
}

export default CreateAccountResolver;
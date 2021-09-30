import {createWriteStream} from "fs";
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
                let avatar = null;
                if(avatarURL){
                    const {createReadStream, filename} = await avatarURL;
                    const newFilename = `${username}-${Date.now()}-${filename}`;
                    const readStream = await createReadStream(`${process.cwd()}/uploads/${newFilename}`);
                    const writeStream = createWriteStream(`${process.cwd()}/uploads/${newFilename}`);
                    readStream.pipe(writeStream);
                    avatar = `http://localhost:4000/:4000/static/${newFilename}`;
                }
                

                const hashPassword = await bcrypt.hash(password, 10);
                
                await client.user.create({
                    data: {
                        username,
                        email,
                        name,
                        location,
                        password:hashPassword,
                        ...(avatarURL && {avatarURL:avatar}),
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
import client from "../../client";
import { Resolvers } from "../../types";
import bcrypt from "bcrypt";
import { protectedResolvers } from "../user.utils";
import {createWriteStream} from "fs";

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


                let avatar = null;
                if(avatarURL){
                    console.log(avatarURL);
                    const {createReadStream, filename} = await avatarURL;
                    const newFilename = `${isLoggedIn.username}-${Date.now()}-${filename}`;
                    const readStream = await createReadStream(`${process.cwd()}/uploads/${newFilename}`);
                    const writeStream = createWriteStream(`${process.cwd()}/uploads/${newFilename}`);
                    readStream.pipe(writeStream);
                    avatar = `http://localhost:4000/static/${newFilename}`;
                    console.log(avatar)
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
                        ...(avatarURL && {avatarURL:avatar}),
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
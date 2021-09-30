import client from "../../client";
import { Resolvers } from "../../types";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { getUser } from "../user.utils";

const LoginResolvers:Resolvers = {
    Mutation: {
        login: async(_,{username, password}, {isLoggedIn}) => {
            const user = await client.user.findUnique({
                where:{
                    username
                }
            });
            
            if(!user) {
                return {
                    ok: false,
                    error: `Not found ${username}`
                }
            }

            const comparePassword = await bcrypt.compare(password, user.password);

            if(!comparePassword){
                return{
                    ok: false,
                    error: "Please check your password."
                }
            }
            
            const token = await jwt.sign({username}, process.env.GENERATOR);

            return {
                ok: true,
                token
            }
        }
    }
}

export default LoginResolvers;
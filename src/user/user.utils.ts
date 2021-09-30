import jwt from "jsonwebtoken";
import client from "../client";
import { JwtUserPayload, Resolver } from "../types";

export const getUser = async (token:string) =>{
    try{
        if(!token){
            return null;
        }
        const {username} = await jwt.verify(token, process.env.GENERATOR) as JwtUserPayload;
        const user = await client.user.findUnique({where:{username}});
        if(user){
            return user
        }else{
            return null
        }
    }catch{
        return null;
    }
}

export const protectedResolvers = (ourResolver: Resolver) => {
    return (root:any, args:any, context:any, info:any) => {
        if(!context.isLoggedIn){
            const query = info.operation.operation === "query";
            if(query){
                return null
            } else {
                return {
                    ok: false,
                    error: "Please login to preform this action"
                };
            }
        };
        return ourResolver(root, args, context, info);
    }
}
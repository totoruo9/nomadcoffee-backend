import client from "../client";
import {GraphQLUpload} from 'graphql-upload';

export default {
    Upload: GraphQLUpload,
    Query: {
        seeUser: async () => {
            return await client.user.findMany({
                select:{
                    id: true,
                    name: true,
                    username: true,
                    location: true,
                    email: true,
                    updateAt:true,
                }
            })
        },
    },
    User: {
        following: ({id}:any,{page}:any) => (
            client.user.findUnique({
                where:{id}
            }).following({
                take:5,
                skip:(page-1)*5
            })
        ),
        followers: ({id}:any, {page}:any) => (
            client.user.findUnique({
                where:{id}
            }).followers({
                take:5,
                skip:(page-1)*5
            })
        )
    }
};
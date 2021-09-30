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
};
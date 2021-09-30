import client from "../client";

export default {
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
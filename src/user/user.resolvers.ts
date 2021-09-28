import client from "../client";

export default {
    Query: {
        seeUser: () => client.user.findMany({where:{id:1}}),
    },
};
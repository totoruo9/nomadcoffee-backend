import client from "../../client";
import { Resolvers } from "../../types";

const SearchUserResolver:Resolvers = {
    Mutation: {
        searchUsers: (_,{keyword, cursor}) => {
            const users = client.user.findMany({
                where:{
                    username:{
                        startsWith: keyword.toLowerCase()
                    }
                },
                take:5,
                skip: cursor ? 1 : 0,
                ...(cursor && {cursor: {id:cursor}})
            });

            return users;
        }
    }
}

export default SearchUserResolver;
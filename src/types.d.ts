type Context = {
    isLoggedIn: any
}

export type Resolver = (root: any, args: any, context: Context, info: any) => any;

export type Resolvers = {
    [key:string]:{
        [key:string]: Resolver
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GENERATOR: string;
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            PWD: string;
        }
    }
}

interface JwtUserPayload {
    username: string;
}
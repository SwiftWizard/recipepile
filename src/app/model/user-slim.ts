export interface UserSlim{
    uuid: number;
    username: string;
    name: string;
    surname?: string;
    nick?: any;
    jwt: string;
    jwtExpireTime: Date; 
    authorities: string[];
}       
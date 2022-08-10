export interface UserThick{
    uuid: number;
    username: string;
    name: string;
    surname?: string;
    nick?: any;
    jwt: string,
    jwtExpireTime: Date
    authorities: string[];
}
import { getRepository } from "typeorm";
import { User } from "./User.entity";
import { crypt } from "./Crypto";

export class UserService {

    public static async get(username: string): Promise<User> {
        return getRepository(User).findOne({where: {username}});
    }

    public static async getById(id: number): Promise<User> {
        return getRepository(User).findOne(id);
    }

    public static async save(args: IUserSaveArgs): Promise<User> {
        const user = new User();
        user.username = args.username;
        user.password = await crypt(args.password);
        return getRepository(User).save(user);
    }

    public static async update(args: IUserUpdateArgs): Promise<void> {
        await getRepository(User).update({username: args.username}, {password: await crypt(args.password)});
    }

    public static async delete(username: string): Promise<void> {
        await getRepository(User).delete({username});
    }

}

export interface IUserSaveArgs {
    username: string;
    password: string;
}

export interface IUserUpdateArgs {
    username: string;
    password: string;
}
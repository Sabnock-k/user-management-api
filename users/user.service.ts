import bcrypt from "bcryptjs";
import { AppDataSource } from "../_helpers/db";
import { User } from "./user.entity";
import { Repository } from "typeorm";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

export async function getAll() {
    return await userRepository.find();
}

export async function getById(id: number) {
    return await userRepository.findOne({ where: { id } });
}

export async function create(params: any) {
    if (await userRepository.findOne({ where: { email: params.email } })) {
        throw new Error(`Email "${params.email}" is already registered`);
    }

    const user = new User();
    Object.assign(user, params);
    user.password = params.password; // This triggers the password setter

    await userRepository.save(user);
}

export async function update(id: number, params: any) {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new Error("User not found");

    Object.assign(user, params);
    await userRepository.save(user);
}

export async function _delete(id: number) {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new Error("User not found");

    await userRepository.remove(user);
}
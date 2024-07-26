import { db } from "@/lib/db";

export const getUserById = async (id: string) => {
    const user = await db.user.findUnique({ where: { id }, });
    if(!user){
        throw new Error("User not found");
    }
    return user;
}

export const getUserByUserName = async ( username: string) => {
    const user = await db.user.findUnique({ where: { username }, })
    return user;
}
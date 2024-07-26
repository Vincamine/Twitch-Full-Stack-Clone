import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
// import { User } from "@prisma/client";
// import { resolve } from "path";

export const getRecommended = async () => {  //:Promise<User[]>
    // await new Promise(resolve => setTimeout(resolve, 5000));
    let userId;
    try {
        const self = await getSelf();
        userId = self.id;
    } catch {
        userId = null;
    }
    let users = [];
    if(userId) {
        users = await db.user.findMany({
            where: {
                NOT: {
                    id: userId,
                },
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    } else {
        // const users: User[] = await db.user.findMany({
        users = await db.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    return users;
};
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { User } from "@prisma/client";
import { resolve } from "path";

export const getRecommended = async (): Promise<User[]> => {
    // await new Promise(resolve => setTimeout(resolve, 5000));
    const users: User[] = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        },
    });
    return users;
};
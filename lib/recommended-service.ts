import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { User } from "@prisma/client";

export const getRecommended = async (): Promise<User[]> => {
    const users: User[] = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        },
    });
    return users;
};
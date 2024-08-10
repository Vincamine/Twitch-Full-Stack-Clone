import { getUserByUserName } from "@/lib/user-service";
import { isFollowingUser } from "@/lib/follow-service";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";
import { notFound } from "next/navigation"; 

interface UserPageProps {
    params: { username: string };
}

export async function generateMetadata({
    params: { username },
}: UserPageProps) {
    return {
        title: username,
    };
}

export default async function UserPage({
    params: { username },
}: UserPageProps) {
    const user = await getUserByUserName(username);

    if (!user || !user.stream) notFound();

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if (isBlocked) notFound();

    return (
        <StreamPlayer 
            user={user} 
            isFollowing={isFollowing} 
            stream={user.stream} 
        />
    );
}
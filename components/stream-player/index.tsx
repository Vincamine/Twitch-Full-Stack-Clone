"use client";

import { LiveKitRoom } from "@livekit/components-react";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { User, Stream } from "@prisma/client";
import { Video, VideoSkeleton } from "./video";
import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { ChatHeaderSkeleton } from "./chat-header";
import { Header } from "./header";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";

type CustomStream = {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    isChatDelayed: boolean;
    isChatEnabled: boolean;
    isChatFollowersOnly: boolean;
};

type CustomUser = {
    id: string;
    username: string;
    bio: string | null;
    stream: CustomStream | null;
    imageUrl: string;
    _count: {followedBy: number};
};

interface StreamPlayerProps {
    user: CustomUser;
    stream: CustomStream;
    isFollowing: boolean;
};

export const StreamPlayer = ({
    user,
    stream,
    isFollowing,
} : StreamPlayerProps) => {
    const {
        token,
        name,
        identity,
    } = useViewerToken(user.id);

    const { collapsed } = useChatSidebar((state) => state);

    if(!token || !name || !identity){
        return <StreamPlayerSkeleton />;
    }
    return (
        <>
            {collapsed && (
                <div className="hidden lg:block fixed top-[100px] right-2 z-50">
                    <ChatToggle />
                </div>
            )}
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className={cn(
                    "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
                    collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
                )}
            >
                <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                    <Video hostName={user.username} hostIdentity={user.id}/>
                    <Header
                        imageUrl={user.imageUrl}
                        hostName={user.username}
                        hostIdentity={user.id}
                        isFollowing={isFollowing}
                        name={stream.name}
                        viewerIdentity={identity}
                    />
                    <InfoCard
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        name={stream.name}
                        thumbnailUrl={stream.thumbnailUrl}
                    />
                    <AboutCard
                        hostName={user.username}
                        hostIdentity={user.id}
                        viewerIdentity={identity}
                        bio={user.bio}
                        followedByCount={user._count.followedBy}
                    />
                </div>
                <div className={cn("col-span-1", collapsed && "hidden")}>
                    <Chat
                        viewerName={name}
                        hostName={user.username}
                        hostIdentity={user.id}
                        isFollowing={isFollowing}
                        isChatEnabled={stream.isChatEnabled}
                        isChatDelayed={stream.isChatDelayed}
                        isChatFollowersOnly={stream.isChatFollowersOnly}
                    />
                </div>
            </LiveKitRoom>
        </>
    );
};

export function StreamPlayerSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                <VideoSkeleton />
                <ChatHeaderSkeleton />
            </div>
            <div className="col-span-1 bg-background">
                <ChatSkeleton />
            </div>
        </div>
    );
  }
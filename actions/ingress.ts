"use server";
import {
    IngressAudioEncodingPreset,
    IngressInput,
    IngressClient,
    IngressVideoEncodingPreset,
    RoomServiceClient,
    type CreateIngressOptions,
} from "livekit-server-sdk";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { RoomParticipantIdentity } from "livekit-server-sdk/dist/proto/livekit_room";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngresses = async (hostIndentity: string) => {
    const ingresses = await ingressClient.listIngress({
        roomName: hostIndentity,
    });
    const rooms = await roomService.listRooms([hostIndentity]);
    
    for(const room of rooms){
        await roomService.deleteRoom(room.name);
    }

    for(const ingress of ingresses){
        if(ingress.ingressId){
            await ingressClient.deleteIngress(ingress.ingressId);
        }
    }
};

export const createIngress = async ( ingressType: IngressInput ) => {
    const self = await getSelf();

    //TODO: reset previous ingress
    await resetIngresses(self.id);
    
    const options: CreateIngressOptions = {
        name: self.username,
        roomName: self.id,
        participantName: self.username,
        participantIdentity: self.id,
    };
    if(ingressType === IngressInput.WHIP_INPUT){
        options.bypassTranscoding = true;
    } else {
        options.video = {
            source: TrackSource.CAMERA,
            preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
        }
        options.audio = {
            source: TrackSource.MICROPHONE,
            preset: IngressAudioEncodingPreset.OPUS_MONO_64KBS, 
        }
    }

    const ingress = await ingressClient.createIngress(ingressType, options);
    if(!ingress || !ingress.url || !ingress.streamKey){ throw new Error("Failed to create ingress"); }

    await db.stream.update({
        where: {
            userId: self.id,
        },
        data: {
            ingressId: ingress.ingressId,
            serverUrl: ingress.url,
            streamKey: ingress.streamKey,
        },
    });

    revalidatePath(`/u/${self.username}/keys`);
    return ingress;
}

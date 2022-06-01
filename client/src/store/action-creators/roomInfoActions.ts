import { IMessage, IParticipant } from "../../types";
import { RoomInfoActionTypes } from "../action-types/roomInfoActionTypes";

export const setIsRoomHost = (isRoomHost: boolean) => {
  return {
    type: RoomInfoActionTypes.SET_IS_ROOM_HOST,
    payload: isRoomHost,
  };
};

export const setIsConnectedOnlyWithAudio = (
  isConnectedOnlyWithAudio: boolean
) => {
  return {
    type: RoomInfoActionTypes.SET_CONNECT_ONLY_WITH_AUDIO,
    payload: isConnectedOnlyWithAudio,
  };
};

export const setIdentity = (identity: { id: string; name: string }) => {
  return {
    type: RoomInfoActionTypes.SET_IDENTITY,
    payload: identity,
  };
};

export const setRoomId = (id: string) => {
  return {
    type: RoomInfoActionTypes.SET_ROOM_ID,
    payload: id,
  };
};

export const setParticipants = (participants: IParticipant[]) => {
  return {
    type: RoomInfoActionTypes.SET_PARTICIPANTS,
    payload: participants,
  };
};

export const setMessages = (msgs: IMessage[]) => {
  return {
    type: RoomInfoActionTypes.SET_MESSAGES,
    payload: msgs,
  };
};

export const setSocketId = (socId: string) => {
  return {
    type: RoomInfoActionTypes.SET_SOCKET_ID,
    payload: socId,
  };
};

export const setDirectChatHistroy = (history: IMessage[]) => {
  return {
    type: RoomInfoActionTypes.SET_DIRECT_CHAT_HISTORY,
    payload: history,
  };
};

export const setActiveConversation = (conversation: string) => {
  return {
    type: RoomInfoActionTypes.SET_ACTIVE_CONVERSATION,
    payload: conversation,
  };
};

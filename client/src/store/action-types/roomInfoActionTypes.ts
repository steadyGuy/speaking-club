import { Identity, IMessage, IParticipant } from "../../types";

export enum RoomInfoActionTypes {
  SET_IS_ROOM_HOST = "SET_IS_ROOM_HOST",
  SET_CONNECT_ONLY_WITH_AUDIO = "SET_CONNECT_ONLY_WITH_AUDIO",
  SET_ROOM_ID = "SET_ROOM_ID",
  SET_IDENTITY = "SET_IDENTITY",
  FETCH_ROOM_INFO_SUCCESS = "FETCH_ROOM_INFO_SUCCESS",
  LOADING_ROOM_INFO = "LOADING_ROOM_INFO",
  SET_PARTICIPANTS = "SET_PARTICIPANTS",
  SET_MESSAGES = "SET_MESSAGES",
  SET_SOCKET_ID = "SET_SOCKET_ID",
  SET_DIRECT_CHAT_HISTORY = "SET_DIRECT_CHAT_HISTORY",
  SET_ACTIVE_CONVERSATION = "SET_ACTIVE_CONVERSATION",
}

export type RoomInfoState = {
  identity: Identity;
  roomId: string;
  isRoomHost: boolean;
  isConnectedOnlyWithAudio: boolean;
  isFull: boolean;
  isExists: boolean;
  loading: boolean;
  participants: IParticipant[];
  messages: IMessage[];
  activeConversation: {
    identity: Identity;
  } | null;
  directChatHistory: IMessage[];
  socketId: string;
};

interface SetDirectChatHistoryAction {
  type: RoomInfoActionTypes.SET_DIRECT_CHAT_HISTORY;
  payload: IMessage[];
}

interface SetSocketIdAction {
  type: RoomInfoActionTypes.SET_SOCKET_ID;
  payload: string;
}

interface SetActiveConversationAction {
  type: RoomInfoActionTypes.SET_ACTIVE_CONVERSATION;
  payload: {
    identity: Identity;
  };
}

interface SetRoomHostAction {
  type: RoomInfoActionTypes.SET_IS_ROOM_HOST;
  payload: boolean;
}

interface SetRoomMessagesAction {
  type: RoomInfoActionTypes.SET_MESSAGES;
  payload: IMessage[];
}

interface SetParticipantsAction {
  type: RoomInfoActionTypes.SET_PARTICIPANTS;
  payload: IParticipant[];
}

interface SetLoadingRoomInfoAction {
  type: RoomInfoActionTypes.LOADING_ROOM_INFO;
  payload: boolean;
}

interface SetConnectOnlyWithAudioAction {
  type: RoomInfoActionTypes.SET_CONNECT_ONLY_WITH_AUDIO;
  payload: boolean;
}

interface SetIdentityAction {
  type: RoomInfoActionTypes.SET_IDENTITY;
  payload: { id: string; name: string };
}

interface SetRoomIdAction {
  type: RoomInfoActionTypes.SET_ROOM_ID;
  payload: string;
}

interface FetchRoomInfoSuccessAction {
  type: RoomInfoActionTypes.FETCH_ROOM_INFO_SUCCESS;
  payload: {
    roomExists: boolean;
    exists: boolean;
  };
}

export type RoomInfoActions =
  | SetRoomHostAction
  | SetConnectOnlyWithAudioAction
  | SetIdentityAction
  | SetRoomIdAction
  | FetchRoomInfoSuccessAction
  | SetLoadingRoomInfoAction
  | SetParticipantsAction
  | SetRoomMessagesAction
  | SetActiveConversationAction
  | SetSocketIdAction
  | SetDirectChatHistoryAction;

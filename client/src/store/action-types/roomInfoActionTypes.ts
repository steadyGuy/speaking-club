import { IParticipant } from "../../types";

export enum RoomInfoActionTypes {
  SET_IS_ROOM_HOST = "SET_IS_ROOM_HOST",
  SET_CONNECT_ONLY_WITH_AUDIO = "SET_CONNECT_ONLY_WITH_AUDIO",
  SET_ROOM_ID = "SET_ROOM_ID",
  SET_IDENTITY = "SET_IDENTITY",
  FETCH_ROOM_INFO_SUCCESS = "FETCH_ROOM_INFO_SUCCESS",
  LOADING_ROOM_INFO = "LOADING_ROOM_INFO",
  SET_PARTICIPANTS = "SET_PARTICIPANTS",
}

export type RoomInfoState = {
  identity: {
    id: string;
    name: string;
  };
  roomId: string;
  isRoomHost: boolean;
  isConnectedOnlyWithAudio: boolean;
  isFull: boolean;
  isExists: boolean;
  loading: boolean;
  participants: IParticipant[];
};

interface SetRoomHostAction {
  type: RoomInfoActionTypes.SET_IS_ROOM_HOST;
  payload: boolean;
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
  | SetParticipantsAction;

export enum RoomInfoActionTypes {
  SET_IS_ROOM_HOST = "SET_IS_ROOM_HOST",
  SET_CONNECT_ONLY_WITH_AUDIO = "SET_CONNECT_ONLY_WITH_AUDIO",
  SET_ROOM_ID = "SET_ROOM_ID",
  SET_IDENTITY = "SET_IDENTITY",
  FETCH_ROOM_INFO_SUCCESS = "FETCH_ROOM_INFO_SUCCESS",
}

export type RoomInfoState = {
  identity: string;
  roomId: string;
  isRoomHost: boolean;
  isConnectedOnlyWithAudio: boolean;
  isFull: boolean;
  isExists: boolean;
};

interface SetRoomHostAction {
  type: RoomInfoActionTypes.SET_IS_ROOM_HOST;
  payload: boolean;
}

interface SetConnectOnlyWithAudioAction {
  type: RoomInfoActionTypes.SET_CONNECT_ONLY_WITH_AUDIO;
  payload: boolean;
}

interface SetIdentityAction {
  type: RoomInfoActionTypes.SET_IDENTITY;
  payload: string;
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
  | FetchRoomInfoSuccessAction;

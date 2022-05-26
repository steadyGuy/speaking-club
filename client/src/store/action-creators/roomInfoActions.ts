import { Dispatch } from "@reduxjs/toolkit";
import {
  ErrorActions,
  ErrorActionTypes,
} from "../action-types/errorActionTypes";
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

export const setIdentity = (identity: string) => {
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

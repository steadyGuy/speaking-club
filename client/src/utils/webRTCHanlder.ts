import { store } from "../store";
import { setError } from "../store/action-creators/errorActions";
import { RoomInfoActionTypes } from "../store/action-types/roomInfoActionTypes";
import { createNewRoom, joinRoom } from "./wss";

const defaultConstraints = {
  audio: true,
  video: true,
};

export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost: boolean,
  identity: string,
  roomId: string | null = null
) => {
  try {
    store.dispatch({ type: RoomInfoActionTypes.LOADING_ROOM_INFO });
    const localStream = await navigator.mediaDevices.getUserMedia(
      defaultConstraints
    );
    showLocalVideoPreview(localStream);
    console.log("isRoomHost", isRoomHost);
    if (isRoomHost) {
      createNewRoom(identity);
    } else if (roomId) {
      joinRoom(identity, roomId);
    }
  } catch (error: any) {
    store.dispatch(setError(error.message));
  } finally {
    store.dispatch({ type: RoomInfoActionTypes.LOADING_ROOM_INFO });
  }
};

export const showLocalVideoPreview = (stream: MediaStream) => {
  //
};

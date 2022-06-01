import { store } from "../store";
import { ErrorActionTypes } from "../store/action-types/errorActionTypes";
import { RoomInfoActionTypes } from "../store/action-types/roomInfoActionTypes";

export const getRoomExists = async (roomId: string) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_HOST}/api/room-exists/${roomId}`
    );
    const json = await res.json();
    if (json) {
      store.dispatch({
        type: RoomInfoActionTypes.FETCH_ROOM_INFO_SUCCESS,
        payload: json,
      });
    }

    return json;
  } catch (err: any) {
    console.log("Error", err);
    store.dispatch({
      type: ErrorActionTypes.SET_ERROR,
      payload: { message: err },
    });
  }
};

export const getTURNCredentials = async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_HOST}/api/get-turn-credentials`
    );
    const json = await res.json();

    return json;
  } catch (err: any) {
    console.log("Error", err);
    store.dispatch({
      type: ErrorActionTypes.SET_ERROR,
      payload: { message: err },
    });
  }
};

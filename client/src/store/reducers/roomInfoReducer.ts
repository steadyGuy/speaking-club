import {
  RoomInfoActions,
  RoomInfoActionTypes,
  RoomInfoState,
} from "../action-types/roomInfoActionTypes";

const initState: RoomInfoState = {
  identity: "",
  roomId: "",
  isRoomHost: false,
  isConnectedOnlyWithAudio: false,
  isFull: false,
  isExists: false,
};

const roomInfoReducer = (state = initState, action: RoomInfoActions) => {
  switch (action.type) {
    case RoomInfoActionTypes.SET_IS_ROOM_HOST:
      return {
        ...state,
        isRoomHost: action.payload,
      };

    case RoomInfoActionTypes.SET_CONNECT_ONLY_WITH_AUDIO:
      return {
        ...state,
        isConnectedOnlyWithAudio: action.payload,
      };

    case RoomInfoActionTypes.SET_ROOM_ID:
      return {
        ...state,
        roomId: action.payload,
      };

    case RoomInfoActionTypes.SET_IDENTITY:
      return {
        ...state,
        identity: action.payload,
      };

    case RoomInfoActionTypes.FETCH_ROOM_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default roomInfoReducer;

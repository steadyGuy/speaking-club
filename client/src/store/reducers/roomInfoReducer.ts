import {
  RoomInfoActions,
  RoomInfoActionTypes,
  RoomInfoState,
} from "../action-types/roomInfoActionTypes";

const initState: RoomInfoState = {
  identity: {
    name: "",
    id: "",
  },
  roomId: "",
  isRoomHost: false,
  isConnectedOnlyWithAudio: false,
  isFull: false,
  isExists: false,
  loading: false,
  participants: [],
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

    case RoomInfoActionTypes.LOADING_ROOM_INFO:
      return {
        ...state,
        loading: !state.loading,
      };

    case RoomInfoActionTypes.SET_PARTICIPANTS:
      return {
        ...state,
        participants: action.payload,
      };

    case RoomInfoActionTypes.SET_PARTICIPANT_STREAM:
      const participantIdx = state.participants.findIndex(
        (roomInfo) => roomInfo.identity.id === action.payload.userId
      );
      const newParticipants = [...state.participants];
      newParticipants[participantIdx].stream = action.payload.stream;
      return {
        ...state,
        participants: newParticipants,
      };

    default:
      return state;
  }
};

export default roomInfoReducer;

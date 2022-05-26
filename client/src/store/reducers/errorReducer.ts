import {
  ErrorActions,
  ErrorActionTypes,
  ErrorState,
} from "../action-types/errorActionTypes";

const initState: ErrorState = {
  message: "",
};

const errorReducer = (state = initState, action: ErrorActions) => {
  switch (action.type) {
    case ErrorActionTypes.SET_ERROR:
      return {
        ...state,
        ...action.payload,
      };

    case ErrorActionTypes.UNSET_ERROR:
      return {
        ...state,
        message: "",
      };

    default:
      return state;
  }
};

export default errorReducer;

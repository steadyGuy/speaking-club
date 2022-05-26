export enum ErrorActionTypes {
  SET_ERROR = "SET_ERROR",
  UNSET_ERROR = "UNSET_ERROR",
}

export type ErrorState = {
  message: string;
};

interface SetErrorAction {
  type: ErrorActionTypes.SET_ERROR;
  payload: ErrorState;
}

interface UnsetErrorAction {
  type: ErrorActionTypes.UNSET_ERROR;
}

export type ErrorActions = SetErrorAction | UnsetErrorAction;

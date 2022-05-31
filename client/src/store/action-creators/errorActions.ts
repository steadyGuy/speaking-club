import { ErrorActionTypes } from "../action-types/errorActionTypes";

export const setError = (msg: string) => {
  return { type: ErrorActionTypes.SET_ERROR, payload: { message: msg } };
};

export const unsetError = () => {
  return {
    type: ErrorActionTypes.UNSET_ERROR,
  };
};

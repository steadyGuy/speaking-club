import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import errorReducer from "./reducers/errorReducer";
import roomInfoReducer from "./reducers/roomInfoReducer";

export const store = configureStore({
  reducer: combineReducers({
    roomInfo: roomInfoReducer,
    error: errorReducer,
  }),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

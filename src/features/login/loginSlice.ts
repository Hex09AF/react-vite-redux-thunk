import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { User, api } from "../../services/auth";

type AuthState = {
  user: User | null;
  token: string | null;
};

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
      }
    );
  },
});

const authReducer = slice.reducer;
export default authReducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

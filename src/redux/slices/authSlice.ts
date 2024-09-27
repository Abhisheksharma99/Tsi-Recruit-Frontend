import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: { id: string; username: string; role: string } | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.token = null;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFail } = authSlice.actions;
export default authSlice.reducer;

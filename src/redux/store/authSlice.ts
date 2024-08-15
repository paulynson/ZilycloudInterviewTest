import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  avatar: string | null;
  buyer_id: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  roles: string[] | null;
}

interface AuthState {
  user: User;
  token: string | null;
}

// Set initial state
const initialState: AuthState = {
  user: {
    avatar: null,
    buyer_id: null,
    name: null,
    email: null,
    phone: null,
    roles: null,
  },
  token: null,
};

// Create the slice
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = initialState.user;
    },
  },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;

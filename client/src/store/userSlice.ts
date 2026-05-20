import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  userName: string | null;
}

const getInitialState = (): UserState => {
  const session = localStorage.getItem('user_session');
  if (session) {
    try {
      const parsedSession = JSON.parse(session);
      return {
        isLoggedIn: true,
        userName: parsedSession.userName,
      };
    } catch (error) {
      return {
        isLoggedIn: false,
        userName: null,
      };
    }
  }
  return {
    isLoggedIn: false,
    userName: null,
  };
};

const initialState: UserState = getInitialState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ userName: string }>) => {
      state.isLoggedIn = true;
      state.userName = action.payload.userName;
      localStorage.setItem('user_session', JSON.stringify({ userName: action.payload.userName }));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userName = null;
      localStorage.removeItem('user_session');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

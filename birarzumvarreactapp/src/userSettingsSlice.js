import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_BASE_URL } from './settings';
import axios from 'axios';

const storedSettings = JSON.parse(localStorage.getItem('settings')) || {};
const { theme = 'light', token = null, isAdmin = false } = storedSettings;

export const getToken = createAsyncThunk(
  'userSettings/getToken',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/login`, { username, password });
      const { token } = response.data;
      const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // set expiry time to 24 hours from now
      localStorage.setItem('settings', JSON.stringify({ ...storedSettings, token, expiryTime }));
      return token;
    } catch (error) {
      return rejectWithValue('Kullanıcı adı veya şifre yanlış.');
    }
  }
);

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState: {
    theme,
    token: {
      status: 'idle',
      value: token,
      error: null,
      expiryTime: storedSettings.expiryTime || null, // initialize expiry time from local storage
    },
    isAdmin,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      const settings = JSON.parse(localStorage.getItem('settings')) || {};
      localStorage.setItem('settings', JSON.stringify({ ...settings, theme: action.payload }));
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
      const settings = JSON.parse(localStorage.getItem('settings')) || {};
      localStorage.setItem('settings', JSON.stringify({ ...settings, isAdmin: action.payload }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        state.token.status = 'loading';
        state.token.error = null;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.token.status = 'succeeded';
        state.token.value = action.payload;
        const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
        state.token.expiryTime = expiryTime; // set expiry time in state
        localStorage.setItem('settings', JSON.stringify({ ...storedSettings, token: action.payload, expiryTime }));
      })
      .addCase(getToken.rejected, (state, action) => {
        state.token.status = 'failed';
        state.token.error = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          const { expiryTime } = state.token;
          if (expiryTime && Date.now() > expiryTime) {
            state.token.value = null;
            state.isAdmin = false;
            state.token.expiryTime = null; // reset expiry time in state
            localStorage.setItem('settings', JSON.stringify({ ...storedSettings, token: null, isAdmin: false }));
          }
        }
      );
  }
});

export const { setTheme, setAdmin } = userSettingsSlice.actions;

export default userSettingsSlice.reducer;
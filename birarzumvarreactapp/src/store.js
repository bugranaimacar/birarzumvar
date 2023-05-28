import { configureStore } from '@reduxjs/toolkit';
import userSettingsReducer from './userSettingsSlice';

const store = configureStore({
  reducer: {
    userSettings: userSettingsReducer,
  },
});

export default store;
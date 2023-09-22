import { createSlice } from '@reduxjs/toolkit';

const NotificationType = {
  NONE: 0,
  ERROR: 1,
  SUCCESS: 2,
};

const initialState = { type: NotificationType.NONE };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setSuccessNotification: (_, action) => ({
      type: NotificationType.SUCCESS,
      message: action.payload,
    }),
    setErrorNotification: (_, action) => ({
      type: NotificationType.ERROR,
      message: action.payload,
    }),
    clearNotification: () => ({ type: NotificationType.NONE }),
  },
});

export const {
  setSuccessNotification,
  setErrorNotification,
  clearNotification,
} = notificationSlice.actions;

export const displayErrorNotification = (content) => {
  return async (dispatch) => {
    dispatch(setErrorNotification(content));
    setTimeout(() => dispatch(clearNotification()), 4000);
  };
};

export const displaySuccessNotification = (content) => {
  return async (dispatch) => {
    dispatch(setSuccessNotification(content));
    setTimeout(() => dispatch(clearNotification()), 4000);
  };
};

export default notificationSlice.reducer;

/*
Previous version w/o slice
const notificationReducer = (state = initialState, action) => {
  console.log(
    'in notificationReducer',
    JSON.parse(JSON.stringify(state)),
    action,
  );
  switch (action.type) {
    case 'SET_ERROR':
      return {
        type: NotificationType.ERROR,
        message: action.payload,
      };
    case 'SET_SUCCESS':
      return {
        type: NotificationType.SUCCESS,
        message: action.payload,
      };
    default:
      return { type: NotificationType.NONE };
  }
};

export default notificationReducer;


Previous version w/o slice : actions functions

export const setErrorNotification = (content) => ({
  type: 'SET_ERROR',
  payload: content,
});

export const setSuccessNotification = (content) => ({
  type: 'SET_SUCCESS',
  payload: content,
});

export const clearNotification = (content) => ({ type: 'CLEAR' });
*/

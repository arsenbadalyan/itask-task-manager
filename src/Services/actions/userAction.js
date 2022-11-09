import userConstants from '../constants/userConstants';

// Session State
export const getSessionState = ({ user }) => user.isSessionActive;
export const changeSessionState = (isActive) => ({
  type: userConstants.CHANGE_STATE,
  payload: isActive,
});

// Username State
export const getUsername = ({ user }) => user.username;
export const changeUsername = (username) => ({
  type: userConstants.CHANGE_USER_NAME,
  payload: username,
});

// Email State
export const getEmail = ({ user }) => user.email;
export const changeEmail = (email) => ({
  type: userConstants.CHANGE_EMAIL,
  payload: email,
});

// Password State
export const getPassword = ({ user }) => user.password;
export const changePassword = (password) => ({
  type: userConstants.CHANGE_PASS,
  payload: password,
});

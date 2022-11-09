import userConstants from '../constants/userConstants';
const initialUserState = {
  isSessionActive: false,
  username: '',
  password: '',
  email: '',
};
export const userReducer = (state = initialUserState, action) => {
  if (action.type === userConstants.CHANGE_STATE) {
    return {
      ...state,
      isSessionActive: action.payload,
    };
  } else if (action.type === userConstants.CHANGE_USER_NAME) {
    return {
      ...state,
      username: action.payload,
    };
  } else if (action.type === userConstants.CHANGE_EMAIL) {
    return {
      ...state,
      email: action.payload,
    };
  } else if (action.type === userConstants.CHANGE_PASS) {
    return {
      ...state,
      password: action.payload,
    };
  }
  return state;
};

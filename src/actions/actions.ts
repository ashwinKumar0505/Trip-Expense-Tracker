import {
  AUTHENTICATION,
  LOGOUT,
  UPDATE_CURRENT_GROUP,
} from "../constants/actionTypes";

export const updateCurrentGroup = (payload: {
  groupId: string;
  groupName: string;
}) => {
  return {
    type: UPDATE_CURRENT_GROUP,
    payload: payload,
  };
};

export const authentication = (payload: {
  isUserAuthenticated: boolean;
  userName: string;
  token: string;
}) => ({
  type: AUTHENTICATION,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});

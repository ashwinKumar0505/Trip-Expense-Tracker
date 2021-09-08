import {
  UPDATE_CURRENT_GROUP,
  AUTHENTICATION,
  LOGOUT,
} from "../constants/actionTypes";
import { setAccessToken } from "../utils/token";

export type WorkspaceState = {
  groupId: string;
  groupName: string;
  isUserAuthenticated: boolean;
  userName: string;
};

type TAction = {
  type: string;
  payload: any;
};

const initialState: WorkspaceState = {
  groupId: "",
  groupName: "",
  isUserAuthenticated: false,
  userName: "",
};

const workspaceReducer = (
  state: WorkspaceState = initialState,
  action: TAction
) => {
  switch (action.type) {
    case UPDATE_CURRENT_GROUP: {
      const { groupId, groupName } = action.payload;
      return {
        ...state,
        groupId,
        groupName,
      };
    }
    case AUTHENTICATION: {
      const { userName, isUserAuthenticated, token } = action.payload;
      setAccessToken(token);
      return {
        ...state,
        isUserAuthenticated,
        userName,
      };
    }
    case LOGOUT: {
      localStorage.clear();
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default workspaceReducer;

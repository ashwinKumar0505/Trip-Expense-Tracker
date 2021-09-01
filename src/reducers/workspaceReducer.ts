import { UPDATE_CURRENT_GROUP } from "../constants/actionTypes";

export type WorkspaceState = {
  groupId: string;
  groupName: string;
};

type TAction = {
  type: string;
  payload: any;
};

const initialState: WorkspaceState = {
  groupId: "",
  groupName: "",
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
    default: {
      return state;
    }
  }
};

export default workspaceReducer;

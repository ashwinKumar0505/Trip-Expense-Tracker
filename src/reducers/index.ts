import { combineReducers } from "redux";

import workspaceReducer, { WorkspaceState } from "./workspaceReducer";

export type RootState = {
  workspace: WorkspaceState;
};

export default combineReducers({ workspace: workspaceReducer });

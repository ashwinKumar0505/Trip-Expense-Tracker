import { RootState } from "../reducers";

export const getGroupName = (state: RootState) => state.workspace.groupName;
export const getGroupId = (state: RootState) => state.workspace.groupId;
export const getUserName = (state: RootState) => state.workspace.userName;
export const getIsUserAuthenticated = (state: RootState) =>
  state.workspace.isUserAuthenticated;

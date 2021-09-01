import { RootState } from "../reducers";

export const getGroupName = (state: RootState) => state.workspace.groupName;
export const getGroupId = (state: RootState) => state.workspace.groupId;

import { UPDATE_CURRENT_GROUP } from "../constants/actionTypes";

export const updateCurrentGroup = (payload: {
  groupId: string;
  groupName: string;
}) => {
  return {
    type: UPDATE_CURRENT_GROUP,
    payload: payload,
  };
};

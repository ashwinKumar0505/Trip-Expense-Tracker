import {
  ADD_EXPENSE,
  ADD_TRIP_MEMBERS,
  ADD_TRIP_NAME,
} from "../constants/actionTypes";

export const addExpense = (expenseData: {
  personName: string;
  amount: number;
  description: string;
}) => {
  return {
    type: ADD_EXPENSE,
    payload: expenseData,
  };
};

export const addTripName = (tripName: string) => ({
  type: ADD_TRIP_NAME,
  payload: {
    tripName,
  },
});

export const addMembers = (members: string[]) => ({
  type: ADD_TRIP_MEMBERS,
  payload: {
    members,
  },
});

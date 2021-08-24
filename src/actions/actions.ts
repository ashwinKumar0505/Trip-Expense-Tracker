import {
  ADD_EXPENSE,
  ADD_TRIP_MEMBERS,
  ADD_TRIP_NAME,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  RESTORE_STATE,
} from "../constants/actionTypes";

type TExpenseData = {
  id: string;
  personName: string;
  amount: number;
  description: string;
};

export const addExpense = (expenseData: TExpenseData) => {
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

export const restoreState = () => ({
  type: RESTORE_STATE,
});

export const deleteExpense = (expenseId: string) => ({
  type: DELETE_EXPENSE,
  payload: {
    id: expenseId,
  },
});

export const editExpense = (expenseData: TExpenseData) => ({
  type: EDIT_EXPENSE,
  payload: expenseData,
});

import { RootState } from "../reducers";

export const getExpensesHistory = (state: RootState) => {
  return state.expense.expensesHistory;
};

export const getTotalExpenses = (state: RootState) => {
  return state.expense.totalAmountInvested;
};

export const getExpensesByPerson = (state: RootState) => {
  return state.expense.expenseByPerson;
};

export const getTripMembers = (state: RootState) => state.expense.tripMembers;

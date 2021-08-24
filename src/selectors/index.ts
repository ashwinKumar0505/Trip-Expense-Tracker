import { RootState } from "../reducers";
import { TExpenseHistory } from "../reducers/expenseReducer";

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

export const getTripName = (state: RootState) => state.expense.tripName;

export const getExpenseById =
  (id: string) =>
  (state: RootState): TExpenseHistory => {
    const selectedExpense = state.expense.expensesHistory.find(
      (expense) => expense.id === id
    );
    if (selectedExpense) return selectedExpense;
    else throw new Error("Error in finding the expense");
  };

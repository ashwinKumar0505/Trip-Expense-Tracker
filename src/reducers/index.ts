import { combineReducers } from "redux";

import expenseReducer, { ExpenseState } from "./expenseReducer";

export type RootState = {
  expense: ExpenseState;
};

export default combineReducers({ expense: expenseReducer });

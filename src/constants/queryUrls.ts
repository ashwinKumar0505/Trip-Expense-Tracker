const BASE_URL = "https://trip-expense-tracker.herokuapp.com";

export const getExpensesByPerson = () => `${BASE_URL}/expenses-by-person`;
export const getExpensesHistory = () => `${BASE_URL}/expenses-history`;
export const getGroupMembers = () => `${BASE_URL}/group-members`;
export const getGroupDetails = () => `${BASE_URL}/group-details`;
export const getExpense = () => `${BASE_URL}/get-expense`;

export const createGroup = () => `${BASE_URL}/create-group`;
export const addExpense = () => `${BASE_URL}/add-expense`;
export const deleteExpense = () => `${BASE_URL}/delete-expense`;
export const editExpense = () => `${BASE_URL}/edit-expense`;
export const deleteGroup = () => `${BASE_URL}/delete-group`;

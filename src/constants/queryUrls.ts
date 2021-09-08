const BASE_URL = "https://trip-expense-tracker.herokuapp.com/";

// Auth
export const signIn = () => `${BASE_URL}/users/sign-in`;
export const signUp = () => `${BASE_URL}/users/sign-up`;

// Groups
export const getExpensesByPerson = () =>
  `${BASE_URL}/groups/expenses-by-person`;
export const getExpensesHistory = () => `${BASE_URL}/groups/expenses-history`;
export const getGroupMembers = () => `${BASE_URL}/groups/group-members`;
export const getGroupDetails = () => `${BASE_URL}/groups/group-details`;
export const getExpense = () => `${BASE_URL}/groups/get-expense`;
export const getAllGroups = () => `${BASE_URL}/groups/all-groups`;

export const createGroup = () => `${BASE_URL}/groups/create-group`;
export const addExpense = () => `${BASE_URL}/groups/add-expense`;
export const deleteExpense = () => `${BASE_URL}/groups/delete-expense`;
export const editExpense = () => `${BASE_URL}/groups/edit-expense`;
export const deleteGroup = () => `${BASE_URL}/groups/delete-group`;

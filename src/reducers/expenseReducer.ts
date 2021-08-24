import {
  ADD_EXPENSE,
  ADD_TRIP_MEMBERS,
  ADD_TRIP_NAME,
  RESTORE_STATE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
} from "../constants/actionTypes";

export type TExpenseHistory = {
  id: string;
  person: string;
  description: string;
  amount: number;
};

export type ExpenseState = {
  tripName: string;
  tripMembers: string[];
  expensesHistory: TExpenseHistory[];
  expenseByPerson: {
    [name: string]: {
      person: string;
      amount: number;
    };
  };
  totalAmountInvested: number;
};

type TAction = {
  type: string;
  payload: any;
};

const initialState: ExpenseState = {
  tripName: "",
  tripMembers: [],
  expensesHistory: [],
  expenseByPerson: {},
  totalAmountInvested: 0,
};

const expenseReducer = (
  state: ExpenseState = initialState,
  action: TAction
) => {
  switch (action.type) {
    case ADD_EXPENSE: {
      const { personName, amount, description, id } = action.payload;
      const expenseState = { ...state };
      if (expenseState.expenseByPerson[personName]) {
        expenseState.expenseByPerson[personName].amount =
          expenseState.expenseByPerson[personName].amount + amount;
      } else {
        expenseState.expenseByPerson = {
          ...expenseState.expenseByPerson,
          [personName]: {
            person: personName,
            amount: amount,
          },
        };
      }

      return {
        ...expenseState,
        expensesHistory: [
          {
            id,
            person: personName,
            amount,
            description,
          },
          ...expenseState.expensesHistory,
        ],
        totalAmountInvested: expenseState.totalAmountInvested + amount,
      };
    }
    case ADD_TRIP_NAME: {
      return {
        ...state,
        tripName: action.payload.tripName,
      };
    }
    case ADD_TRIP_MEMBERS: {
      const { members } = action.payload;
      const updatedExpenseByPerson = { ...state.expenseByPerson };

      members.forEach((member: string) => {
        updatedExpenseByPerson[member] = {
          person: member,
          amount: 0,
        };
      });

      return {
        ...state,
        tripMembers: members,
        expenseByPerson: updatedExpenseByPerson,
      };
    }
    case RESTORE_STATE: {
      return initialState;
    }
    case DELETE_EXPENSE: {
      const { id } = action.payload;

      const selectedExpenseIndex = state.expensesHistory.findIndex(
        (entry) => entry.id === id
      );

      if (selectedExpenseIndex === -1) return state;

      const { person, amount } = state.expensesHistory[selectedExpenseIndex];
      const updatedExpenseByPerson = { ...state.expenseByPerson };

      updatedExpenseByPerson[person].amount =
        updatedExpenseByPerson[person].amount - amount;

      return {
        ...state,
        expensesHistory: [
          ...state.expensesHistory.slice(0, selectedExpenseIndex),
          ...state.expensesHistory.slice(selectedExpenseIndex + 1),
        ],
        expenseByPerson: updatedExpenseByPerson,
        totalAmountInvested: state.totalAmountInvested - amount,
      };
    }
    case EDIT_EXPENSE: {
      const { personName, description, amount, id } = action.payload;

      const selectedExpenseIndex = state.expensesHistory.findIndex(
        (entry) => entry.id === id
      );

      if (selectedExpenseIndex === -1) return state;

      const updatedExpensesHistory = [...state.expensesHistory];
      const updatedExpenseByPerson = { ...state.expenseByPerson };

      const oldExpense = state.expensesHistory[selectedExpenseIndex];
      const oldExpensePersonName = oldExpense.person;

      updatedExpenseByPerson[oldExpensePersonName] = {
        ...updatedExpenseByPerson[oldExpensePersonName],
        amount:
          updatedExpenseByPerson[oldExpensePersonName].amount -
          oldExpense.amount,
      };
      updatedExpenseByPerson[personName] = {
        ...updatedExpenseByPerson[personName],
        amount: updatedExpenseByPerson[personName].amount + amount,
      };

      updatedExpensesHistory[selectedExpenseIndex] = {
        id,
        person: personName,
        description,
        amount,
      };

      return {
        ...state,
        expensesHistory: updatedExpensesHistory,
        expenseByPerson: updatedExpenseByPerson,
        totalAmountInvested:
          state.totalAmountInvested - oldExpense.amount + amount,
      };
    }
    default: {
      return state;
    }
  }
};

export default expenseReducer;

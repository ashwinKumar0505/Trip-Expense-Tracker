import {
  ADD_EXPENSE,
  ADD_TRIP_MEMBERS,
  ADD_TRIP_NAME,
} from "../constants/actionTypes";

type TExpenseHistory = {
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
      const { personName, amount, description } = action.payload;
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
        expensesHistory: [],
        totalAmountInvested: 0,
      };
    }
    default: {
      return state;
    }
  }
};

export default expenseReducer;

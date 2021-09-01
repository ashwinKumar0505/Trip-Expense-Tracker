import { useQuery } from "react-query";
import axios from "axios";
import {
  getExpensesHistory,
  getExpensesByPerson,
  getGroupMembers,
  getGroupDetails,
  getExpense,
} from "../constants/queryUrls";

type TResponseData = {
  _id: string;
  person: string;
  description: string;
  amount: string;
};

export const useGetExpensesHistory = (groupId: string) => {
  return useQuery("expenses-history", () =>
    axios.get(getExpensesHistory(), { params: { groupId } }).then((res) =>
      res.data.map((val: TResponseData) => ({
        ...val,
        id: val._id,
      }))
    )
  );
};

export const useGetExpensesByPerson = (groupId: string) => {
  return useQuery("expenses-by-person", () =>
    axios
      .get(getExpensesByPerson(), { params: { groupId } })
      .then((res) => res.data)
  );
};

export const useGetGroupMembers = (groupId: string) => {
  return useQuery("group-members", () =>
    axios
      .get(getGroupMembers(), { params: { groupId } })
      .then((res) => res.data)
  );
};

export const useGetGroupDetails = (groupId: string) => {
  return useQuery("group-details", () =>
    axios
      .get(getGroupDetails(), { params: { groupId } })
      .then((res) => res.data)
  );
};

export const useGetExpenseById = (
  expenseId: string,
  groupId: string,
  onSuccess?: (data: any) => void
) => {
  return useQuery(
    "expense-by-id",
    () =>
      axios
        .get(getExpense(), { params: { groupId, id: expenseId } })
        .then((res) => res.data),
    {
      onSuccess: onSuccess,
    }
  );
};

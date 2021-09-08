import { useMutation } from "react-query";
import {
  addExpense,
  createGroup,
  deleteExpense,
  editExpense,
  deleteGroup,
  signIn,
  signUp,
} from "../constants/queryUrls";
import axios from "../utils/customAxios";

type TAddExpensePayload = {
  personName: string;
  amount: number;
  description: string;
  groupId: string;
};

type TEditExpensePayload = {
  personName: string;
  amount: number;
  description: string;
  groupId: string;
  expenseId: string;
};

export const useCreateGroup = (
  onSuccess?: (data: any) => void,
  onError?: () => void
) => {
  return useMutation(
    (payload: { groupName: string; groupMembers: string[] }) =>
      axios.post(createGroup(), payload).then((res) => res.data),
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useAddExpense = (
  onSuccess?: (data: any) => void,
  onError?: () => void
) => {
  return useMutation(
    (payload: TAddExpensePayload) => {
      return axios.post(addExpense(), payload).then((res) => res.data);
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useDeleteExpense = (
  onSuccess?: (data: any) => void,
  onError?: () => void
) => {
  return useMutation(
    (payload: { groupId: string; expenseId: string }) => {
      return axios
        .delete(deleteExpense(), { data: payload })
        .then((res) => res.data);
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useEditExpense = (
  onSuccess?: (data: any) => void,
  onError?: () => void
) => {
  return useMutation(
    (payload: TEditExpensePayload) => {
      return axios.put(editExpense(), payload).then((res) => res.data);
    },
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useDeleteGroup = (
  onSuccess?: (data: any) => void,
  onError?: () => void
) => {
  return useMutation(
    (payload: { groupId: string }) =>
      axios.delete(deleteGroup(), { data: payload }).then((res) => res.data),
    {
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

export const useSignIn = (
  onSuccess?: (data: any) => void,
  onError?: (err: any) => void
) => {
  return useMutation(
    (payload: { email: string; password: string }) =>
      axios.post(signIn(), payload).then((res) => res.data),
    {
      onSuccess,
      onError,
    }
  );
};

export const useSignUp = (
  onSuccess?: (data: any) => void,
  onError?: (err: any) => void
) => {
  return useMutation(
    (payload: { email: string; password: string; name: string }) =>
      axios.post(signUp(), payload).then((res) => res.data),
    {
      onSuccess,
      onError,
    }
  );
};

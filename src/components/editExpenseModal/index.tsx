import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Input,
  Textarea,
  Flex,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import { AiFillCaretDown } from "react-icons/ai";

import { getGroupId } from "../../selectors";
import { useGetExpenseById, useGetGroupMembers } from "../../queries/query";
import { useEditExpense } from "../../queries/mutation";
import Loader from "../loader";

type TEditExpenseModal = {
  isOpen: boolean;
  onClose: () => void;
  expenseId: string;
  refetchExpensesHistory: () => void;
};

const EditExpenseModal = ({
  isOpen,
  onClose,
  expenseId,
  refetchExpensesHistory,
}: TEditExpenseModal) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const groupId = useSelector(getGroupId);
  const toast = useToast();

  const onSuccess = () => {
    refetchExpensesHistory();
    toast({
      title: "Expense updated",
      description: "The Expense had been updated successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    onClose();
  };

  const onError = () => {
    toast({
      title: "Error while updating the expense",
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const onExpenseFetched = (data: any) => {
    const {
      person,
      description: expenseDescription,
      amount: expenseAmount,
    } = data;

    setName(person);
    setAmount(expenseAmount.toString());
    setDescription(expenseDescription);
  };

  const expenseFetcher = useGetExpenseById(
    expenseId,
    groupId,
    onExpenseFetched
  );
  const tripMembers = useGetGroupMembers(groupId).data || [];
  const expenseEditor = useEditExpense(onSuccess, onError);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    expenseEditor.mutate({
      expenseId,
      personName: name,
      amount: parseInt(amount, 10),
      description,
      groupId,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {expenseFetcher.isFetching ? (
          <Box p={5}>
            <Loader />
          </Box>
        ) : (
          <form onSubmit={submitHandler}>
            <ModalHeader borderBottom="1px solid rgba(0, 0, 0, 0.08)">
              Edit Expense
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              pt={4}
              pb={4}
              borderBottom="1px solid rgba(0, 0, 0, 0.08)"
            >
              <Box>
                <ComboBox
                  options={tripMembers}
                  onSelect={(value) => setName(value)}
                  placeholder="Enter the name of the person"
                  name="personName"
                  style={{
                    width: "100%",
                    marginBottom: "1.25rem",
                  }}
                  defaultValue={name}
                  editable={false}
                  renderRightElement={() => <AiFillCaretDown />}
                  highlightColor="#E2E8F0"
                  selectedOptionColor="#CBD5E0"
                />
                <Textarea
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  mb={4}
                  minH="175px"
                  isRequired
                  errorBorderColor="crimson"
                  autoComplete="off"
                />
                <Input
                  type="number"
                  value={amount}
                  name="personName"
                  placeholder="Enter the amount invested"
                  onChange={(e) => setAmount(e.target.value)}
                  isRequired
                  errorBorderColor="crimson"
                  autoComplete="off"
                />
              </Box>
            </ModalBody>

            <ModalFooter>
              <Flex>
                <Button
                  type="submit"
                  colorScheme="green"
                  width="45%"
                  mr={5}
                  isLoading={expenseEditor.isLoading}
                >
                  Update
                </Button>
                <Button
                  colorScheme="green"
                  width="45%"
                  mr={5}
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditExpenseModal;

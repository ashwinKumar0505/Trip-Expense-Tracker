import {
  Box,
  Heading,
  Input,
  Textarea,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import { AiFillCaretDown } from "react-icons/ai";
import { getGroupId } from "../../selectors";
import { useGetGroupMembers } from "../../queries/query";
import { useAddExpense } from "../../queries/mutation";

const ExpenseAddForm = ({
  refetchRecords,
}: {
  refetchRecords: (val: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();
  const groupId = useSelector(getGroupId);
  const groupMembersGetter = useGetGroupMembers(groupId);

  const clearForm = () => {
    setName("");
    setAmount("");
    setDescription("");
  };

  const onSuccess = () => {
    toast({
      title: "Expense Added",
      description: "The Expense had been added successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    clearForm();
    refetchRecords(true);
  };

  const onError = () => {
    toast({
      title: "Error while creating the group",
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const expenseAdder = useAddExpense(onSuccess, onError);

  const tripMembers = groupMembersGetter.isFetched
    ? groupMembersGetter.data
    : [];

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    expenseAdder.mutate({
      personName: name,
      amount: parseInt(amount),
      description,
      groupId,
    });
  };

  return (
    <Box p={5} boxShadow="0 0 3px 2px rgba(0,0,0,0.1)" borderRadius="md">
      <Heading fontSize="xl" marginBottom={5} textAlign="center">
        Add New Expense
      </Heading>
      <form onSubmit={submitHandler}>
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
            editable={false}
            renderRightElement={() => <AiFillCaretDown />}
            defaultValue={name}
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
            mb={6}
            isRequired
            errorBorderColor="crimson"
            autoComplete="off"
          />
          <Flex>
            <Button
              type="submit"
              colorScheme="green"
              width="45%"
              mr={5}
              isLoading={expenseAdder.isLoading}
            >
              Add Expense
            </Button>
            <Button
              colorScheme="green"
              width="45%"
              mr={5}
              variant="outline"
              onClick={clearForm}
            >
              Clear
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  );
};

export default ExpenseAddForm;

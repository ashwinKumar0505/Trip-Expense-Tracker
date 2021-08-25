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
import { useDispatch, useSelector } from "react-redux";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import { addExpense } from "../../actions/actions";
import { getTripMembers } from "../../selectors";
import { AiFillCaretDown } from "react-icons/ai";
import generateId from "../../utils/generateId";

const ExpenseAddForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const tripMembers = useSelector(getTripMembers);

  const clearForm = () => {
    setName("");
    setAmount("");
    setDescription("");
  };

  console.log(name);
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      addExpense({
        id: generateId(),
        personName: name,
        amount: parseInt(amount, 10),
        description,
      })
    );
    clearForm();
    toast({
      title: "Expense Added",
      description: "The Expense had been added successfully.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
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
          />
          <Flex>
            <Button type="submit" colorScheme="green" width="45%" mr={5}>
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

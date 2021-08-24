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
import { useDispatch, useSelector } from "react-redux";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import { AiFillCaretDown } from "react-icons/ai";
import { addExpense } from "../../actions/actions";
import generateId from "../../utils/generateId";
import { getTripMembers } from "../../selectors";

type TAddExpenseModal = {
  isOpen: boolean;
  onClose: () => void;
};

const AddExpenseModal = ({ isOpen, onClose }: TAddExpenseModal) => {
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={submitHandler}>
          <ModalHeader borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Edit Expense
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pt={4} pb={4} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
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
                isRequired
                errorBorderColor="crimson"
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Flex width="70%">
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
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddExpenseModal;

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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import { AiFillCaretDown } from "react-icons/ai";

import { getExpenseById, getTripMembers } from "../../selectors";
import { editExpense } from "../../actions/actions";

type TEditExpenseModal = {
  isOpen: boolean;
  onClose: () => void;
  expenseId: string;
};

const EditExpenseModal = ({
  isOpen,
  onClose,
  expenseId,
}: TEditExpenseModal) => {
  const {
    person,
    description: expenseDescription,
    amount: expenseAmount,
  } = useSelector(getExpenseById(expenseId));
  const [name, setName] = useState(person);
  const [amount, setAmount] = useState(expenseAmount.toString());
  const [description, setDescription] = useState(expenseDescription);
  const dispatch = useDispatch();
  const tripMembers = useSelector(getTripMembers);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      editExpense({
        id: expenseId,
        personName: name,
        amount: parseInt(amount, 10),
        description,
      })
    );
    onClose();
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
              <Button type="submit" colorScheme="green" width="45%" mr={5}>
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
      </ModalContent>
    </Modal>
  );
};

export default EditExpenseModal;

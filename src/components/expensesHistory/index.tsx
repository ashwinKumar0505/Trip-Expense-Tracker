import {
  Box,
  Flex,
  Tag,
  Text,
  Image,
  Avatar,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getExpensesHistory } from "../../selectors";
import RecordsEmptyImage from "../../images/empty-records.svg";
import { deleteExpense } from "../../actions/actions";
import { useState } from "react";
import EditExpenseModal from "../editExpenseModal";

const ExpensesHistory = () => {
  const [selectedExpense, setSelectedExpense] = useState("");
  const expenses = useSelector(getExpensesHistory);
  const dispatch = useDispatch();

  const expenseDeleteHandler = (expenseId: string) => {
    dispatch(deleteExpense(expenseId));
    setSelectedExpense("");
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (expenses.length === 0) {
    return (
      <Flex
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Image
          src={RecordsEmptyImage}
          alt="No records found"
          height="350px"
          width="350px"
          mb={5}
          fallback={<Spinner />}
        />
        <Text fontSize="xl" fontWeight="semibold" color="gray.600">
          No Expenses Added Yet
        </Text>
      </Flex>
    );
  }
  return (
    <Box height="95%" overflowY="auto" p={4}>
      {selectedExpense.length !== 0 && (
        <EditExpenseModal
          isOpen={isOpen}
          onClose={onClose}
          expenseId={selectedExpense}
        />
      )}
      {expenses.map((expense, index) => (
        <Flex
          boxShadow="0 0 3px 2px rgba(0,0,0,0.1)"
          borderRadius="md"
          key={expense.id}
          py={2}
          px={4}
          my={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box mr={5}>
            <Flex>
              <Avatar name={expense.person} mr={2} size="xs" />
              <Text fontSize="md" color="black" mb={2} fontWeight="semibold">
                {expense.person}
              </Text>
            </Flex>
            <Text fontSize="sm" color="gray.500">
              {expense.description}
            </Text>
          </Box>
          <Flex alignItems="center">
            <Tag
              colorScheme="green"
              variant="outline"
              _hover={{ backgroundColor: "green.50" }}
              mr={2}
            >
              Rs. {expense.amount}
            </Tag>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<BsThreeDotsVertical />}
                variant="none"
                width="20px"
                height="30px"
                onClick={() => setSelectedExpense(expense.id)}
              />
              <MenuList>
                <MenuItem>
                  <Flex alignItems="center" onClick={onOpen}>
                    <Icon as={FaEdit} mr={2} />
                    <Text>Edit Expense</Text>
                  </Flex>
                </MenuItem>
                <MenuItem>
                  <Flex
                    alignItems="center"
                    onClick={() => expenseDeleteHandler(expense.id)}
                  >
                    <Icon as={AiFillDelete} mr={2} />
                    <Text>Delete Expense</Text>
                  </Flex>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      ))}
    </Box>
  );
};

export default ExpensesHistory;

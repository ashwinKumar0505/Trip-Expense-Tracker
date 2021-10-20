/* eslint-disable react-hooks/exhaustive-deps */
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
  useToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getGroupId } from "../../selectors";
import RecordsEmptyImage from "../../images/empty-records.svg";
import { useState } from "react";
import EditExpenseModal from "../editExpenseModal";
import { useGetExpensesHistory } from "../../queries/query";
import { useDeleteExpense } from "../../queries/mutation";
import Loader from "../loader";
import { useEffect } from "react";

const ExpensesHistory = ({
  refetchRecords,
  isRecordAdded,
}: {
  refetchRecords: (val: boolean) => void;
  isRecordAdded: boolean;
}) => {
  const [selectedExpense, setSelectedExpense] = useState("");
  const groupId = useSelector(getGroupId);
  const toast = useToast();

  const refetchExpensesHistory = () => expensesHistoryFetcher.refetch();

  useEffect(() => {
    if (isRecordAdded) {
      refetchExpensesHistory();
      refetchRecords(false);
    }
  }, [isRecordAdded]);

  const onDeletionSuccess = () => {
    setSelectedExpense("");
    refetchExpensesHistory();
  };

  const onDeletionError = () => {
    toast({
      title: "Error while deleting the expense",
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const expensesHistoryFetcher = useGetExpensesHistory(groupId);
  const expenseDelete = useDeleteExpense(onDeletionSuccess, onDeletionError);
  const expenses = expensesHistoryFetcher.data || [];

  const expenseDeleteHandler = (expenseId: string) => {
    expenseDelete.mutate({
      groupId,
      expenseId,
    });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (expensesHistoryFetcher.isFetching) {
    return <Loader loadingText="Loading Expenses History ..." />;
  }

  if (expensesHistoryFetcher.isFetched && expenses.length === 0) {
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
    <Box height="90%" overflowY="auto" p={4}>
      {isOpen && (
        <EditExpenseModal
          isOpen={isOpen}
          onClose={onClose}
          expenseId={selectedExpense}
          refetchExpensesHistory={refetchExpensesHistory}
        />
      )}
      {expenses.map(
        (
          expense: {
            id: string;
            person: string;
            description: string;
            amount: string;
          },
          index: number
        ) => (
          <Flex
            boxShadow="0 0 3px 2px rgba(0,0,0,0.1)"
            borderRadius="md"
            key={expense.id}
            py={2}
            pl={4}
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
                  <MenuItem onClick={onOpen}>
                    <Flex alignItems="center">
                      <Icon as={FaEdit} mr={2} />
                      <Text>Edit Expense</Text>
                    </Flex>
                  </MenuItem>
                  <MenuItem onClick={() => expenseDeleteHandler(expense.id)}>
                    <Flex alignItems="center">
                      <Icon as={AiFillDelete} mr={2} />
                      <Text>Delete Expense</Text>
                    </Flex>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        )
      )}
    </Box>
  );
};

export default ExpensesHistory;

import { Box, Flex, Tag, Text, Image, Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getExpensesHistory } from "../../selectors";
import RecordsEmptyImage from "../../images/empty-records.svg";

const ExpensesHistory = () => {
  const expenses = useSelector(getExpensesHistory);

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
        />
        <Text fontSize="xl" fontWeight="semibold" color="gray.600">
          No Expenses Added Yet
        </Text>
      </Flex>
    );
  }
  return (
    <Box height="95%" overflowY="auto" p={4}>
      {expenses.map((expense, index) => (
        <Flex
          boxShadow="0 0 3px 2px rgba(0,0,0,0.1)"
          borderRadius="md"
          key={expense.person + expense.description + index}
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
          <Box>
            <Tag
              colorScheme="green"
              variant="outline"
              _hover={{ backgroundColor: "green.50" }}
            >
              Rs. {expense.amount}
            </Tag>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default ExpensesHistory;

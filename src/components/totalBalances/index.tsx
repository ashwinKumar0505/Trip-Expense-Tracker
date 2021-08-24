import {
  Box,
  Alert,
  AlertIcon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  getTotalExpenses,
  getExpensesByPerson,
  getExpensesHistory,
} from "../../selectors";

const TotalBalances = () => {
  const totalAmount = useSelector(getTotalExpenses);
  const expensesByPerson = useSelector(getExpensesByPerson);
  const expensesHistory = useSelector(getExpensesHistory);

  const totalPersons = Object.keys(expensesByPerson).length;
  const expensePerPerson = Math.round(totalAmount / totalPersons);

  const PersonExpenseStatus = (personName: string, expenseAmount: number) => {
    if (expenseAmount === totalAmount) return `${personName} is settled up`;
    else if (expenseAmount > expensePerPerson) {
      return `${personName} gets back Rs.${expenseAmount - expensePerPerson}`;
    } else {
      return `${personName} yet to give Rs.${expensePerPerson - expenseAmount}`;
    }
  };
  return (
    <Box height="95%" overflowY="auto" p={4}>
      <Alert
        status="info"
        variant="left-accent"
        borderRadius="sm"
        marginBottom={4}
      >
        <AlertIcon fontWeight="medium" />
        The total amount invested for the trip is&nbsp;
        <Box fontWeight="semibold">{totalAmount}</Box>
      </Alert>
      <Accordion allowMultiple>
        {Object.values(expensesByPerson).map((entry) => {
          const individualExpensesHistory = expensesHistory.filter(
            (expense) => expense.person === entry.person
          );
          return (
            <AccordionItem
              key={entry.person}
              borderLeft="1px solid #e2e8f0"
              borderRight="1px solid #e2e8f0"
            >
              <AccordionButton
                backgroundColor="gray.100"
                _hover={{
                  backgroundColor: "gray.50",
                }}
              >
                <Box flex="1" textAlign="left">
                  {PersonExpenseStatus(entry.person, entry.amount)}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <UnorderedList>
                  {individualExpensesHistory.length > 0 ? (
                    individualExpensesHistory.map((expense, index) => (
                      <ListItem key={expense.amount + index}>
                        Invested Rs.{expense.amount} at {expense.description}
                      </ListItem>
                    ))
                  ) : (
                    <Text>No investments done yet</Text>
                  )}
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
};

export default TotalBalances;

/* eslint-disable react-hooks/exhaustive-deps */
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
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetGroupDetails } from "../../queries/query";
import { getGroupId } from "../../selectors";
import Loader from "../loader";

const TotalBalances = ({
  refetchRecords,
  isRecordAdded,
}: {
  refetchRecords: (val: boolean) => void;
  isRecordAdded: boolean;
}) => {
  const groupId = useSelector(getGroupId);
  const groupDetailFetcher = useGetGroupDetails(groupId);

  useEffect(() => {
    if (isRecordAdded) {
      groupDetailFetcher.refetch();
      refetchRecords(false);
    }
  }, [isRecordAdded]);

  if (groupDetailFetcher.isFetched && groupDetailFetcher.data) {
    const totalAmount = groupDetailFetcher.data.totalAmountInvested;
    const expensesByPerson = groupDetailFetcher.data.expensesByPerson;
    const expensesHistory = groupDetailFetcher.data.expensesHistory;

    const totalPersons = Object.keys(expensesByPerson).length;
    const expensePerPerson = Math.round(totalAmount / totalPersons);

    const PersonExpenseStatus = (personName: string, expenseAmount: number) => {
      if (expenseAmount === expensePerPerson)
        return `${personName} is settled up`;
      else if (expenseAmount > expensePerPerson) {
        return `${personName} gets back Rs.${expenseAmount - expensePerPerson}`;
      } else {
        return `${personName} yet to give Rs.${
          expensePerPerson - expenseAmount
        }`;
      }
    };
    return (
      <Box height="95%" overflowY="auto" p={4}>
        <Alert
          status="info"
          variant="left-accent"
          borderRadius="md"
          marginBottom={4}
          bg="white"
          boxShadow="0 0 2px 1px rgba(0,0,0,0.1)"
          colorScheme="green"
        >
          <AlertIcon fontWeight="medium" />
          <Box>
            <Text mb={1}>
              The total amount invested for the trip is&nbsp;
              <Box fontWeight="semibold" as="span">
                Rs.{totalAmount}
              </Box>
            </Text>
            <Text>
              The expenses per person is&nbsp;
              <Box fontWeight="semibold" as="span">
                Rs.{expensePerPerson}
              </Box>
            </Text>
          </Box>
        </Alert>
        <Accordion allowMultiple>
          {Object.values(expensesByPerson).map((entry: any) => {
            const individualExpensesHistory = expensesHistory.filter(
              (expense: any) => expense.person === entry.person
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
                      individualExpensesHistory.map(
                        (expense: any, index: number) => (
                          <ListItem key={expense.amount + index}>
                            Invested Rs.{expense.amount} at{" "}
                            {expense.description}
                          </ListItem>
                        )
                      )
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
  } else {
    return <Loader />;
  }
};

export default TotalBalances;

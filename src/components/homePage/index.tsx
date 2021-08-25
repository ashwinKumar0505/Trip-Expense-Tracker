import React from "react";
import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  useMediaQuery,
  useDisclosure,
} from "@chakra-ui/react";
import ExpensesHistory from "../expensesHistory";
import TotalBalances from "../totalBalances";
import ExpenseAddForm from "../expenseAddForm";
import AddIconFloater from "../addIconFloater";
import AddExpenseModal from "../addExpenseModal";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTripName } from "../../selectors";

const HomePage = () => {
  const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tripName = useSelector(getTripName);
  const history = useHistory();

  useEffect(() => {
    if (tripName.length === 0) history.push("/");
  }, [history, tripName.length]);

  return (
    <Flex width="100%" height="100%">
      <AddExpenseModal isOpen={isOpen} onClose={onClose} />
      <Box
        width={isLargerThan1000 ? "65%" : "100%"}
        p={5}
        boxShadow="0 0 3px 2px rgba(0,0,0,0.1)"
        borderRadius="md"
        height="100%"
      >
        <Tabs isFitted variant="enclosed" colorScheme="green" height="100%">
          <TabList>
            <Tab>Expenses History</Tab>
            <Tab>Total Balances</Tab>
          </TabList>
          <TabPanels height="100%">
            <TabPanel height="100%" p={0}>
              <ExpensesHistory />
            </TabPanel>
            <TabPanel height="100%" p={0}>
              <TotalBalances />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {isLargerThan1000 && (
        <Box width="35%" ml={4}>
          <ExpenseAddForm />
        </Box>
      )}
      {!isLargerThan1000 && (
        <Box position="fixed" bottom={5} right={5}>
          <AddIconFloater onOpen={onOpen} />
        </Box>
      )}
    </Flex>
  );
};

export default HomePage;

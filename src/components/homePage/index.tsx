import React from "react";
import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
} from "@chakra-ui/react";
import ExpensesHistory from "../expensesHistory";
import TotalBalances from "../totalBalances";
import ExpenseAddForm from "../expenseAddForm";

const HomePage = () => {
  return (
    <Flex width="100%" height="90%">
      <Box
        width="65%"
        mr={4}
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
            <TabPanel height='100%' p={0}>
              <TotalBalances />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Box width="35%">
        <ExpenseAddForm />
      </Box>
    </Flex>
  );
};

export default HomePage;

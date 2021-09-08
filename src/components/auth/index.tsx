/* eslint-disable react-hooks/exhaustive-deps */
import {
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { getIsUserAuthenticated } from "../../selectors";
import SignIn from "./sign-in";
import SignUp from "./sign-up";

const Auth = () => {
  const isUserAuthenticated = useSelector(getIsUserAuthenticated);
  const history = useHistory();

  useEffect(() => {
    if (isUserAuthenticated) history.push("/my-groups");
  }, []);

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        maxW={"lg"}
        boxShadow="xl"
        width="600px"
        bg="white"
        borderRadius="md"
        m={3}
      >
        <Tabs
          isFitted
          variant="enclosed"
          colorScheme="green"
          height="100%"
          isLazy={true}
        >
          <TabList>
            <Tab
              fontWeight="600"
              height="70px"
              bg="#D2D8D8"
              _selected={{ bg: "white", color: "green.800" }}
            >
              LOGIN
            </Tab>
            <Tab
              fontWeight="600"
              height="70px"
              bg="#D2D8D8"
              _selected={{ bg: "white", color: "green.800" }}
            >
              SIGN UP
            </Tab>
          </TabList>
          <TabPanels height="100%">
            <TabPanel height="100%" p={0}>
              <SignIn />
            </TabPanel>
            <TabPanel height="100%" p={0}>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};

export default Auth;

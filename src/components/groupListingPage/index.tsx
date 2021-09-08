import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Box,
  Flex,
  Grid,
  Heading,
  InputGroup,
  Input,
  Text,
  Image,
  Spinner,
  useMediaQuery,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import Group from "./group";
import emptyGroupsImage from "../../images/no-groups.svg";
import { useGetAllGroups } from "../../queries/query";
import Loader from "../loader";
import GroupPageLayout from "../layouts/groupPageLayout";

const NoGroups = () => {
  const history = useHistory();
  return (
    <Flex
      w="100%"
      px={0}
      mb={16}
      mx="auto"
      align="center"
      borderRadius="lg"
      justify="center"
      direction="column"
      mt={10}
    >
      <Image
        src={emptyGroupsImage}
        alt="No records found"
        height="350px"
        width="350px"
        mb={5}
        fallback={<Spinner />}
      />
      <Text
        mt={8}
        color="gray.900"
        fontFamily="body"
        fontSize="20px"
        fontWeight="semibold"
      >
        Unfortunately You Have No Active Groups
      </Text>
      <Text
        fontSize="sm"
        lineHeight="base"
        mt={2}
        color="gray.700"
        fontWeight="medium"
      >
        Let's Start &nbsp;
        <Text
          as="span"
          decoration="underline"
          fontWeight="semibold"
          lineHeight="base"
          color="green.800"
          onClick={() => history.push("/create-group")}
        >
          <Link to="/">creating a new group</Link>
        </Text>
        &nbsp; now 🤩
      </Text>
    </Flex>
  );
};

const GroupsListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const groupNamesFetcher = useGetAllGroups();
  const [isLargerThan850] = useMediaQuery("(min-width: 850px)");

  return (
    <GroupPageLayout bottomNavbarContent="Create New Group">
      {searchTerm.length === 0 && groupNamesFetcher.data?.length === 0 ? (
        <NoGroups />
      ) : (
        <Flex
          w="100%"
          direction="column"
          items="center"
          justify="center"
          h="100%"
        >
          <Flex
            h="100%"
            direction="column"
            align="center"
            justify="center"
            w="100%"
          >
            <Box textAlign="center" width="100%">
              <Heading
                fontSize={isLargerThan850 ? "3xl" : "2xl"}
                fontWeight="bold"
              >
                Let's Get Started
              </Heading>
              <Text
                color="gray.400"
                fontFamily="body"
                fontSize="md"
                fontWeight="normal"
                my={2}
              >
                Choose your group to get started
              </Text>
              <Flex justifyContent="center" mt={8} mb={2} width="100%">
                <InputGroup borderColor="grey.300" maxW="450px" mx={5}>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={FiSearch} color="gray.500" />}
                  />
                  <Input
                    placeholder="Search"
                    height={10}
                    boxShadow="sm"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    _placeholder={{
                      color: "grey.300",
                    }}
                  />
                </InputGroup>
              </Flex>

              {searchTerm.length > 0 && groupNamesFetcher.data.length === 0 && (
                <Flex
                  align="center"
                  justify="center"
                  mt={6}
                  mb={10}
                  width="100%"
                >
                  <Text>{`No search results for "${searchTerm}"`}</Text>
                </Flex>
              )}
            </Box>
            <Flex
              width="100%"
              flex={1}
              overflowY="auto"
              px={isLargerThan850 ? "50px" : 5}
              py={5}
            >
              {groupNamesFetcher.isFetching && (
                <Loader loadingText="Loading GroupNames ..." />
              )}
              {!groupNamesFetcher.isFetching && (
                <Grid
                  width="100%"
                  templateColumns={
                    isLargerThan850 ? "repeat(3, 1fr)" : "repeat(1,1fr)"
                  }
                  columnGap={isLargerThan850 ? 8 : 2}
                  rowGap={2}
                  height="fit-content"
                >
                  {groupNamesFetcher.data?.map(
                    (group: {
                      id: string;
                      name: string;
                      amount: string;
                      memberCount: number;
                    }) => (
                      <Box key={group.id}>
                        <Group groupDetails={{ ...group }} />
                      </Box>
                    )
                  )}
                </Grid>
              )}
            </Flex>
          </Flex>
        </Flex>
      )}
    </GroupPageLayout>
  );
};

export default GroupsListPage;

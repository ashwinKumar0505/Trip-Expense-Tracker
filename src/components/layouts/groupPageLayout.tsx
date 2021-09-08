import { ReactElement } from "react";

import { Link, useHistory } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Icon,
  useMediaQuery,
} from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import logo from "../../images/logo.png";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/actions";

const GroupPageLayout = ({
  children,
  bottomNavbarContent,
}: {
  children: ReactElement | ReactElement[];
  bottomNavbarContent: "My Groups" | "Create New Group";
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLargerThan850] = useMediaQuery("(min-width: 850px)");

  const logoutClickHandler = () => {
    dispatch(logout());
    history.push("/");
  };
  return (
    <Box w="100vw" h="100vh">
      <Box
        px={isLargerThan850 ? "50px" : 0}
        h={`calc(100% - 10rem)`}
      >
        <Flex alignItems="center" pt={14} mb={10} justify="center">
          <Image src={logo} height={10} width={10} alt="logo" mr={3} />
          <Heading
            fontSize="38px"
            fontWeight="500"
            fontFamily="Roboto, sans-serif"
            background="linear-gradient(90deg, rgba(81,181,73,0.9178046218487395) 35%, rgba(16,119,48,1) 100%)"
            color="transparent"
            backgroundClip="text"
          >
            Trip Expense Tracker
          </Heading>
        </Flex>
        {children}
      </Box>
      <Flex
        position="fixed"
        justify="space-between"
        align="center"
        left={0}
        bottom={0}
        width="100%"
        h={14}
        bg="blue.800"
      >
        <Flex
          alignItems="center"
          _hover={{ textDecoration: "none" }}
          _focus={{ outline: "none" }}
          fontWeight="medium"
          color="white"
          fontSize="md"
          sx={{
            pl: "50px",
            cursor: "pointer",
          }}
          onClick={logoutClickHandler}
        >
          <Icon as={BiLogOut} color="white" mr={2} />
          <Text>Logout</Text>
        </Flex>
        <Box sx={{ pr: "50px" }}>
          <Link
            to={
              bottomNavbarContent === "My Groups"
                ? "/my-groups"
                : "/create-group"
            }
          >
            <Text
              as="span"
              fontWeight="medium"
              color="white"
              fontSize="md"
              sx={{ cursor: "pointer" }}
            >
              {bottomNavbarContent} -&gt;
            </Text>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default GroupPageLayout;

import {
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import logo from "../../images/logo.png";
import { IoMdSettings } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { MdGroup, MdGroupAdd } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateCurrentGroup } from "../../actions/actions";
import { useDeleteGroup } from "../../queries/mutation";
import { getGroupId } from "../../selectors";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();
  const groupId = useSelector(getGroupId);

  const onDeletionSuccess = () => {
    dispatch(updateCurrentGroup({ groupId: "", groupName: "" }));
    history.push("/");
    toast({
      title: "Group deleted Successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
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

  const logoutClickHandler = () => {
    dispatch(logout());
    history.push("/");
  };

  const deleteGroupHandler = useDeleteGroup(onDeletionSuccess, onDeletionError);

  const deleteGroup = () => {
    deleteGroupHandler.mutate({ groupId });
  };

  return (
    <Flex
      py={2}
      px={4}
      justifyContent="space-between"
      boxShadow="md"
      alignItems="center"
    >
      <Flex alignItems="center">
        <Image src={logo} height={10} width={10} alt="logo" mr={3} />
        <Heading
          fontSize="24px"
          fontWeight="500"
          fontFamily="Roboto, sans-serif"
          background="linear-gradient(90deg, rgba(81,181,73,0.9178046218487395) 35%, rgba(16,119,48,1) 100%)"
          color="transparent"
          backgroundClip="text"
        >
          Trip Expense Tracker
        </Heading>
      </Flex>
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<IoMdSettings />}
            variant="none"
            fontSize="x-large"
            cursor="pointer"
          />
          <MenuList>
            <MenuItem
              onClick={() => history.push("/my-groups")}
              fontSize="14px"
            >
              <Flex alignItems="center">
                <Icon as={MdGroup} mr={2} w={5} h={6} />
                <Text fontWeight="medium">My Trips</Text>
              </Flex>
            </MenuItem>
            <MenuItem
              onClick={() => history.push("/create-group")}
              fontSize="14px"
            >
              <Flex alignItems="center">
                <Icon as={MdGroupAdd} mr={2} w={5} h={6} />
                <Text fontWeight="medium">Create New Trip</Text>
              </Flex>
            </MenuItem>
            <MenuItem onClick={deleteGroup} fontSize="14px">
              <Flex alignItems="center">
                <Icon as={AiFillDelete} mr={2} w={5} h={4} />
                <Text fontWeight="medium">Delete Trip</Text>
              </Flex>
            </MenuItem>
            <MenuItem onClick={logoutClickHandler} fontSize="14px">
              <Flex alignItems="center">
                <Icon as={BiLogOut} mr={2} w={5} h={4} />
                <Text fontWeight="medium">Logout</Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Header;

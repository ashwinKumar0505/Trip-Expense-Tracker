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
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentGroup } from "../../actions/actions";
import { useDeleteGroup } from "../../queries/mutation";
import { getGroupId } from "../../selectors";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();
  const groupId = useSelector(getGroupId);
  const [isSettingsEnabled, setIsSettingsEnabled] = useState(false);

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

  const deleteGroupHandler = useDeleteGroup(onDeletionSuccess, onDeletionError);

  const deleteGroup = () => {
    deleteGroupHandler.mutate({ groupId });
  };

  useEffect(() => {
    if (groupId.length > 0) setIsSettingsEnabled(true);
    else setIsSettingsEnabled(false);
  }, [groupId]);

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
        >
          Trip Expense Tracker
        </Heading>
      </Flex>
      {isSettingsEnabled && (
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
                bg="red.500"
                color="white"
                _hover={{ bg: "red.600" }}
                _focus={{ bg: "red.600" }}
                onClick={deleteGroup}
              >
                <Flex alignItems="center">
                  <Icon as={AiFillDelete} mr={2} />
                  <Text fontWeight="medium">Delete Group</Text>
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Flex>
  );
};

export default Header;

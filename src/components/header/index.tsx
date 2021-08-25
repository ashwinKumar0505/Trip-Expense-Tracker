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
} from "@chakra-ui/react";
import logo from "../../images/logo.png";
import { IoMdSettings } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { restoreState } from "../../actions/actions";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const deleteGroup = () => {
    dispatch(restoreState());
    history.push("/");
  };
  const isSettingsEnabled = history.location.pathname !== "/";
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

import { Box, Flex, Heading, Icon, Image, Tooltip } from "@chakra-ui/react";
import logo from "../../images/logo.png";
import { IoMdSettings } from "react-icons/io";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const gotoTripDetails = () => {
    if (history.location.pathname !== "/edit-trip-details") {
      history.push("/edit-trip-details");
    }
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
          fontSize="28px"
          fontWeight="500"
          fontFamily="Roboto, sans-serif"
        >
          Trip Expense Tracker
        </Heading>
      </Flex>
      {isSettingsEnabled && (
        <Box>
          <Tooltip label="Edit Trip details">
            <Box>
              <Icon
                as={IoMdSettings}
                fontSize="x-large"
                cursor="pointer"
                onClick={gotoTripDetails}
              />
            </Box>
          </Tooltip>
        </Box>
      )}
    </Flex>
  );
};

export default Header;

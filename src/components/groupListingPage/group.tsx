import React, { useCallback, useState } from "react";
import { Box, Button, Flex, Text, Icon } from "@chakra-ui/react";
import { AiFillCar } from "react-icons/ai";
import { IoMdArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateCurrentGroup } from "../../actions/actions";

type GroupProps = {
  groupDetails: {
    name: string;
    id: string;
    memberCount: number;
    amount: string;
  };
};

const itemStyles = {
  w: "100%",
  p: 2,
  mb: 4,
  bg: "white",
  border: "1px",
  borderRadius: "md",
  boxShadow: "0px 2px 14px 1px rgba(0, 0, 0, 0.06)",
  borderColor: "transparent",
  _hover: { cursor: "pointer", borderColor: "green.700", bg: "gray.50" },
};

const iconContainerStyles = {
  direction: "column",
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "full",
  p: 2,
};

const buttonStyles = {
  h: 10,
  w: 8,
  color: "green.800",
  _focus: {
    outline: "none",
  },
};

const Group = ({ groupDetails }: GroupProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  const enableHighlight = useCallback(() => setIsHighlighted(true), []);
  const disableHighlight = useCallback(() => setIsHighlighted(false), []);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id, name, memberCount, amount } = groupDetails;

  const groupClickHandler = () => {
    dispatch(updateCurrentGroup({ groupId: id, groupName: name }));
    history.push("/expense-tracker");
  };

  return (
    <Box
      key={id}
      onMouseEnter={enableHighlight}
      onMouseLeave={disableHighlight}
      sx={itemStyles}
      onClick={groupClickHandler}
    >
      <Flex w="100%" align="center" justify="space-between">
        <Flex w={20} justify="center" align="center">
          <Flex
            sx={iconContainerStyles}
            bg={isHighlighted ? "green.500" : "white"}
          >
            <Icon
              sx={{ zIndex: 1, width: "20px", height: "20px" }}
              as={AiFillCar}
              color={isHighlighted ? "white" : "green.500"}
            />
          </Flex>
        </Flex>
        <Box flex={1}>
          <Text
            fontWeight="medium"
            noOfLines={1}
            lineHeight="shorter"
            fontFamily="fonts.body"
            fontSize="xl"
          >
            {name}
          </Text>
          <Flex mt={1}>
            <Text fontSize="xs" color="gray.600" mr={4} mb={2}>
              Members :{" "}
              <Box as="span" fontWeight="medium">
                {memberCount}
              </Box>
            </Text>
            <Text fontSize="xs" color="gray.600" mb={2}>
              Amount :{" "}
              <Box as="span" fontWeight="medium">
                Rs.{amount}{" "}
              </Box>
            </Text>
          </Flex>
        </Box>
        <Flex align="center" justify="flex-end">
          <Button
            variant="link"
            type="button"
            sx={buttonStyles}
            visibility={isHighlighted ? "visible" : "hidden"}
          >
            <Icon as={IoMdArrowForward} />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Group;

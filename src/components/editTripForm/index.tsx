import { Box, Text, Input, Flex, Icon, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addMembers, addTripName, restoreState } from "../../actions/actions";
import { ENTER_KEY } from "../../constants/keys";
import { getTripMembers, getTripName } from "../../selectors";

const EditTripForm = () => {
  const tripName = useSelector(getTripName);
  const tripMembers = useSelector(getTripMembers);
  const [name, setName] = useState(tripName);
  const [participants, setParticipants] = useState<string[]>(
    tripMembers.length === 0 ? [""] : tripMembers
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const updateParticipants = (index: number, value: string) => {
    setParticipants([
      ...participants.slice(0, index),
      value,
      ...participants.slice(index + 1),
    ]);
  };

  const addNewMember = () => {
    setParticipants([...participants, ""]);
  };

  const deleteGroup = () => {
    dispatch(restoreState());
    history.push("/");
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTripName(name));
    dispatch(addMembers(participants));
    history.push("/expense-tracker");
  };

  const keydownHandler = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.key === ENTER_KEY) addNewMember();
  };
  return (
    <Flex width="100%" justifyContent="center" alignItems="center">
      <Box
        width="650px"
        p={5}
        boxShadow="0 0 3px 2px rgba(0,0,0,0.1)"
        borderRadius="md"
        maxH="80vh"
        overflowY="auto"
      >
        <form onSubmit={submitHandler} style={{ width: "100%" }}>
          <Box>
            <Text mb={2}>Enter Your Trip name</Text>
            <Input
              value={name}
              name="personName"
              onChange={(e) => setName(e.target.value)}
              mb={4}
              isRequired
              errorBorderColor="crimson"
              placeholder="Enter the trip name"
              autoComplete="false"
            />
          </Box>
          <Box>
            <Text mb={2}>Trip Members</Text>
            <Box>
              {participants.map((participant, index) => (
                <Input
                  key={index}
                  value={participant}
                  name="personName"
                  placeholder={`Enter the person ${index + 1} name`}
                  onChange={(e) => updateParticipants(index, e.target.value)}
                  mb={4}
                  isRequired
                  errorBorderColor="crimson"
                  autoFocus={index !== 0 && index + 1 === participants.length}
                  autoComplete="false"
                />
              ))}
            </Box>
            <Flex
              bg="gray.100"
              _hover={{ bg: "gray.200" }}
              p={2}
              borderRadius="md"
              cursor="pointer"
              alignItems="center"
              justifyContent="center"
              onClick={addNewMember}
              tabIndex={0}
              onKeyDown={keydownHandler}
            >
              <Icon as={GrAddCircle} mr={2} />
              <Text>Add New Member</Text>
            </Flex>
          </Box>
          <Flex width="100%" mt={5} justifyContent="space-between">
            <Button type="submit" colorScheme="green" width="46%" mr={5}>
              Update
            </Button>
            <Button
              colorScheme="green"
              width="46%"
              variant="outline"
              onClick={deleteGroup}
            >
              Delete Group
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default EditTripForm;

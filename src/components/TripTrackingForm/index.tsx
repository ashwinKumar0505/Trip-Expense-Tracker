import { Box, Text, Input, Flex, Icon, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addMembers, addTripName } from "../../actions/actions";

const TripTrackingForm = () => {
  const [name, setName] = useState("");
  const [participants, setParticipants] = useState<string[]>([""]);
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

  const clearForm = () => {
    setName("");
    setParticipants([""]);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTripName(name));
    dispatch(addMembers(participants));
    history.push("/expense-tracker");
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
            >
              <Icon as={GrAddCircle} mr={2} />
              <Text>Add New Member</Text>
            </Flex>
          </Box>
          <Flex width="100%" mt={5} justifyContent="space-between">
            <Button type="submit" colorScheme="green" width="46%" mr={5}>
              Start Tracking
            </Button>
            <Button
              colorScheme="green"
              width="46%"
              variant="outline"
              onClick={clearForm}
            >
              Clear All
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default TripTrackingForm;

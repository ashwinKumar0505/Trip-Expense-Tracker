import { Icon, Box } from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";

const AddIconFloater = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <Box
      borderRadius="full"
      p={3}
      bg="green.500"
      cursor="pointer"
      onClick={onOpen}
    >
      <Icon as={IoMdAdd} color="white" fontSize="x-large" />
    </Box>
  );
};

export default AddIconFloater;

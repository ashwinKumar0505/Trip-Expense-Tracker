import { Flex, Spinner, Text } from "@chakra-ui/react";

const Loader = ({ loadingText = "Loading..." }: { loadingText?: string }) => {
  return (
    <Flex
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Spinner size="lg" mb={2} />
      <Text fontWeight="medium">{loadingText}</Text>
    </Flex>
  );
};
export default Loader;

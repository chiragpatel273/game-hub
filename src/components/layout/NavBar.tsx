import { Flex, Text } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Flex
      as="header"
      align="center"
      height="14"
      px="4"
      borderBottomWidth="1px"
      gap="4"
    >
      <Text fontWeight="semibold">Game Hub</Text>
    </Flex>
  );
};

export default NavBar;

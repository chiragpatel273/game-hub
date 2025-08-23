import { Flex, Text, Box } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "../ui/color-mode";

const NavBar = () => {
  const bg = useColorModeValue("white", "gray.900");
  const border = useColorModeValue("gray.200", "whiteAlpha.300");
  return (
    <Flex
      as="header"
      align="center"
      height="14"
      px="4"
      borderBottomWidth="1px"
      gap="4"
      bg={bg}
      borderColor={border}
    >
      <Text fontWeight="semibold">Game Hub</Text>
      <Box ml="auto">
        <ColorModeButton />
      </Box>
    </Flex>
  );
};

export default NavBar;

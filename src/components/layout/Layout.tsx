import { Box, Flex } from "@chakra-ui/react";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <Flex direction="column" minH="100dvh">
      <NavBar />
      <Flex flex="1" overflow="hidden">
        <Box
          as="nav"
          width="64"
          borderRightWidth="1px"
          display={{ base: "none", md: "block" }}
        />
        <Box as="main" flex="1" overflowY="auto" p="4">
          Main
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;

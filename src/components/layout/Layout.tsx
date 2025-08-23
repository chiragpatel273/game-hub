import { Box, Flex } from "@chakra-ui/react";
import GameGrid from "./GameGrid";
import GenreList from "./GenreList";
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
          display={{ base: "none", md: "block" }}>
          <GenreList />
        </Box>
        <Box as="main" flex="1" overflowY="auto" p="4">
          <GameGrid />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;

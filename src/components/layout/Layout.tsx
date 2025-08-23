import type { Genre } from "@/hooks/useGenres";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import GameGrid from "./GameGrid";
import GenreList from "./GenreList";
import NavBar from "./NavBar";

const Layout = () => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  return (
    <Flex direction="column" minH="100dvh">
      <NavBar />
      <Flex flex="1" overflow="hidden">
        <Box
          as="nav"
          width="64"
          borderRightWidth="1px"
          display={{ base: "none", md: "block" }}>
          <GenreList
            onSelectGenre={(genre) => setSelectedGenre(genre)}
            selectedGenre={selectedGenre}
          />
        </Box>
        <Box as="main" flex="1" overflowY="auto" p="4">
          <GameGrid selectedGenre={selectedGenre} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;

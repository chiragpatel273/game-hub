import type { Genre } from "@/hooks/useGenres";
import type { Platform } from "@/hooks/usePlatforms";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import GameGrid from "./GameGrid";
import GenreList from "./GenreList";
import NavBar from "./NavBar";
import PlatformSelector from "./PlatformSelector";

const Layout = () => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
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
          <Flex
            mb={4}
            gap={3}
            wrap="wrap"
            align="center"
            justify="space-between"
          >
            <PlatformSelector onSelectPlatform={(platform) => setSelectedPlatform(platform)} selectedPlatform={selectedPlatform} />
          </Flex>
          <GameGrid selectedGenre={selectedGenre} selectedPlatform={selectedPlatform} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;

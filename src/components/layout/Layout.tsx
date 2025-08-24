import type { Genre } from "@/hooks/useGenres";
import type { Platform } from "@/hooks/usePlatforms";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import GameGrid from "./GameGrid";
import GenreList from "./GenreList";
import NavBar from "./NavBar";
import PlatformSelector from "./PlatformSelector";
import SortSelector from "./SortSelector";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
}

const Layout = () => {
  const [gameQuery, setGameQuery] = useState<GameQuery>({ genre: null, platform: null, sortOrder: "" });
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
            onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })}
            selectedGenre={gameQuery.genre}
          />
        </Box>
        <Box as="main" flex="1" overflowY="auto" p="4">
          <Flex
            mb={4}
            gap={3}
            wrap="wrap"
            align="center"
          >
            <PlatformSelector onSelectPlatform={(platform) => setGameQuery({ ...gameQuery, platform })} selectedPlatform={gameQuery.platform} />
            <SortSelector onSelectSortOrder={(sortOrder) => setGameQuery({ ...gameQuery, sortOrder })} sortOrder={gameQuery.sortOrder} />
          </Flex>
          <GameGrid gameQuery={gameQuery} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;

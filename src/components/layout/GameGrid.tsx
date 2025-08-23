import useGames from "@/hooks/useGames";
import { SimpleGrid } from "@chakra-ui/react";
import GameCard from "./GameCard";

const GameGrid = () => {
    const { games, error } = useGames();

    return (
        <div className="game-grid">
            {error && <div className="error-message">{error}</div>}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </SimpleGrid>
        </div>
    );
};

export default GameGrid;
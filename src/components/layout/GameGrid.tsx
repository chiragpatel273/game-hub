import useGames from "@/hooks/useGames";
import { SimpleGrid } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";

const GameGrid = () => {
    const { games, error, loading } = useGames();
    const skeletons = [1, 2, 3, 4, 5, 6];
    return (
        <div className="game-grid">
            {error && <div className="error-message">{error}</div>}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                {loading &&
                    skeletons.map((skeleton) => (
                        <GameCardSkeleton key={skeleton} />
                    ))}
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </SimpleGrid>
        </div>
    );
};

export default GameGrid;
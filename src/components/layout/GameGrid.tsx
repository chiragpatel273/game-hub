import useGames from "@/hooks/useGames";
import { SimpleGrid } from "@chakra-ui/react";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";

const GameGrid = () => {
    const { data, error, loading } = useGames();
    const skeletons = [1, 2, 3, 4, 5, 6];
    return (
        <div className="game-grid">
            {error && <div className="error-message">{error}</div>}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
                {loading &&
                    skeletons.map((skeleton) => (
                        <GameCardContainer key={skeleton}>
                            <GameCardSkeleton />
                        </GameCardContainer>
                    ))}
                {data.map((game) => (
                    <GameCardContainer key={game.id}>
                        <GameCard game={game} />
                    </GameCardContainer>
                ))}
            </SimpleGrid>
        </div>
    );
};

export default GameGrid;
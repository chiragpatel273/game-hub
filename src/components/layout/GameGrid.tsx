import useGames from "@/hooks/useGames";

const GameGrid = () => {
    const { games, error } = useGames();

    return (
        <div className="game-grid">
            {error && <div className="error-message">{error}</div>}
            {games.map((game) => (
                <div key={game.id} className="game-card">
                    <h3>{game.title}</h3>
                    <p>Genre: {game.genre}</p>
                </div>
            ))}
        </div>
    );
};

export default GameGrid;
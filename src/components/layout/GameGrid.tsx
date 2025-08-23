import apiClient from "@/services/api-client";
import { useEffect, useState } from "react";

interface Game {
    id: number;
    title: string;
    genre: string;
}

interface FetchGameResponse {
    message: string;
    data: Game[];
}

const GameGrid = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await apiClient.get<FetchGameResponse>('/games');
                setGames(response.data.data);
            } catch (err) {
                setError("Failed to fetch games");
            }
        };

        fetchGames();
    }, []);

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
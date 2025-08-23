import apiClient from "@/services/api-client";
import { CanceledError } from "axios";
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

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const fetchGames = async () => {
            try {
                const response = await apiClient.get<FetchGameResponse>('/games', {
                    signal: controller.signal
                });
                setGames(response.data.data);
            } catch (err: any) {
                if (err instanceof CanceledError) return;
                setError(err.message);
            }
        };

        fetchGames();

        return () => controller.abort();
    }, []);

    return { games, error };
};

export default useGames;
import apiClient from "@/services/api-client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
}

interface FetchGameResponse {
    count: string;
    results: Game[];
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
                setGames(response.data.results);
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
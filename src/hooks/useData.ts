import apiClient from "@/services/api-client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface FetchResponse<T> {
    count: string;
    results: T[];
}

const useData = <T>(endpoint: string) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await apiClient.get<FetchResponse<T>>(endpoint, {
                    signal: controller.signal
                });
                setLoading(false);
                setData(response.data.results);
            } catch (err: any) {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, []);

    return { data, error, loading };
};

export default useData;
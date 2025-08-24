import apiClient from "@/services/api-client";
import { CanceledError, type AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

interface FetchResponse<T> {
    count: string;
    results: T[];
}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await apiClient.get<FetchResponse<T>>(endpoint, {
                    signal: controller.signal,
                    ...requestConfig,
                });
                setData(response.data.results);
                setLoading(false);
            } catch (err: any) {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
        // deps intentionally provided by caller; do NOT wrap to avoid creating a new reference each render
    }, deps ?? []);

    return { data, error, loading };
};

export default useData;
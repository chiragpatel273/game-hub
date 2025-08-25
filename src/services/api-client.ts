import axios from "axios";

// Use Vite env variable. Define VITE_RAWG_API_KEY in .env.local (gitignored) or deployment env vars.
const RAWG_KEY = import.meta.env.VITE_RAWG_API_KEY as string | undefined;

if (!RAWG_KEY) {
    // eslint-disable-next-line no-console
    console.warn('[api-client] VITE_RAWG_API_KEY is missing. Limited or failed requests may occur.');
}

const apiClient = axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: RAWG_KEY ? { key: RAWG_KEY } : undefined,
});

export default apiClient;
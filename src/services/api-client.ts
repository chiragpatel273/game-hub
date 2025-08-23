import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '3424b45fd632466582afe83b0d564420'
    }
});

export default apiClient;
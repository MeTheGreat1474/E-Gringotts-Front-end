import api from "../api/axiosConfig";

export const reload = async (username, amount) => {
    try {
        const response = await api.get(`/Account/${username}/reload?amount=${amount}`);
        if (response.status === 200) {
            console.log('Reload successful');
            return response.data;
        } else {
            console.log('Oops, something went wrong!');
        }
    } catch (error) {
        console.error(error);
    }
}
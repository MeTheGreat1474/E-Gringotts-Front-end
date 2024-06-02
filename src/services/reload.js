import api from "../api/axiosConfig";

//post data to reload api
export const reload = async (userId, amount, remark) => {
    try {
        const response = await api.post(`/Transaction/reload?userId=${userId}&amount=${amount}&remarks=${remark}`);
        // const response = await api.get(`/Account/${username}/reload?amount=${amount}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.log('Oops, something went wrong!');
        }
    } catch (error) {
        console.error(error);
    }
}
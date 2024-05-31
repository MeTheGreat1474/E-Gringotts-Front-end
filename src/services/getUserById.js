import api from "../api/axiosConfig";

export const getUserById = async (id) => {
    try {
        const response = await api.get(`/Account/userById/${id}`);
        if (response.status === 200) {
            console.log(response.data)
            return response.data;
        } else {
            console.log('Oops, we haven\'t got JSON!');
        }
    } catch (error) {
        console.error(error);
    }
};

export const getUserByUserId = async (userId) => {
    try {
        const response = await api.get(`/Account/userId/${userId}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.log('Oops, we haven\'t got JSON!');
        }
    } catch (error) {
        console.error(error);
    }
};

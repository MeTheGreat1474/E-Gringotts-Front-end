import api from "../api/axiosConfig";

export const postAddCurrency = async (currencyPairs) => {
    try {
        const response = await api.post(`/Transaction/addCurrencyPair`, currencyPairs);
        console.log('in api ' , response.data);
        return response.data;
    } catch (error) {
        console.error('Error during adding currency pair:', error);
        return null;
    }
}
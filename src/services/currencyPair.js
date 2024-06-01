import api from "../api/axiosConfig";

export const postAddCurrency = async (fromCurrency, toCurrency, exchangeRate, processingFee) => {
    try {
        const response = await api.post(`/Transaction/addCurrencyPair?currencies=Knut&currencies=Sickle`, {
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            exchangeRate: exchangeRate,
            processingFee: processingFee
        });
        console.log('in api ' , response.data)
        return response.data;
    } catch (error) {
        console.error('Error during adding currency pair:', error);
        return null;
    }
}
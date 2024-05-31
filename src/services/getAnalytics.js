import { useState, useEffect } from "react";
import api from "../api/axiosConfig";

function toQueryString(params) {
    return '?' + Object.keys(params).map(key => {
        if (Array.isArray(params[key])) {
            return `${encodeURIComponent(key)}=${encodeURIComponent(params[key].join(','))}`;
        } else {
            // Encode key-value pair
            return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
        }
    }).join('&');
}

export const useGetAnalyticsDefault = (userId) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAnalytic= async () => {
            try {
                const response = await api.get(`/Transaction/analytics?userId=${userId}`);

                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.log('Oops, we haven\'t got JSON!');
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAnalytic();
    }, [userId]);
    return data;
};

export const useGetAnalytics = () => {
    const [analyticsData, setAnalyticsData] = useState([]);
    const getAnalyticsData = async (userId, startDate, endDate, frequency, paymentMethod) => {
        try { 
            const params = {
                userId: userId || "null",
                startDate: startDate || "null",
                endDate: endDate || "null",
                frequency: frequency || 'Monthly',
                paymentMethod: paymentMethod !== null ? paymentMethod : ["null"]
            };
    
            const queryString = toQueryString(params); // Construct query string using the toQueryString function
    
            const response = await api.get(`/Transaction/analytics${queryString}`); // Append query string to the URL
    
            if (response.status === 200) {
                const data = response.data; // Extract data from response
                setAnalyticsData(data); // Update state with fetched data
                console.log('data:', data); // Log fetched data
                return data; // Return fetched data
            } else {
                console.log('Oops, something went wrong!');
            }
        } catch (error) {
            console.log('Error fetching analytics data:', error);
        }
    };
    return { analyticsData, getAnalyticsData };
};

/*export const useGetAnalyticsDate = (username, startDate, endDate) => {

    const { user, getUser } = useGetUser(username);
    useEffect(() => {
        getUser();
    }, [getUser]);
    // console.log(user?.userId)

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAnalytic= async () => {
            try {
                const response = await api.get(`/Transaction/api/analytics?userId=${user?.userId}&startDate=${startDate}&endDate=${endDate}`);

                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.log('Oops, we haven\'t got JSON!');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAnalytic();
    }, [user, startDate, endDate]);

    return data;
};

// For Frequency
export const useGetAnalyticsFrequency = (username, frequency) => {

    const { user, getUser } = useGetUser(username);
    useEffect(() => {
        getUser();
    }, [getUser]);
    // console.log(user?.userId)

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAnalytic= async () => {
            try {
                const response = await api.get(`/Transaction/api/analytics?userId=${user?.userId}&frequency=${frequency}`);
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.log('Oops, we haven\'t got JSON!');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAnalytic();
    }, [user, frequency]);

    return data;
};

// For Payment Method (Transaction Type)
export const useGetAnalyticsPaymentMethod = (username, paymentMethod) => {

    const { user, getUser } = useGetUser(username);
    useEffect(() => {
        getUser();
    }, [getUser]);
    // console.log(user?.userId)

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAnalytic= async () => {
            try {
                const paymentMethodParams = paymentMethod.map(cat => `paymentMethod=${cat}`).join("&");
                const response = await api.get(`/Transaction/api/analytics?userId=${user?.userId}&${paymentMethodParams}`);

                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.log('Oops, we haven\'t got JSON!');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchAnalytic();
    }, [user, paymentMethod]);

    return data;
};*/



    //const [fetchDataOnButtonClick, setFetchDataOnButtonClick] = useState(false);

    //const getAnalyticsData = async (userId, startDate, endDate, frequency, paymentMethod) => {
        /*const { user, getUser } = useGetUser(username);
        useEffect(() => {
            getUser();
        }, [getUser]);*/
        /*try { 
            const response = await api.get('/api/analytics', {
                params: {
                    userId: userId,
                    startDate: startDate || null,
                    endDate: endDate || null,
                    frequency: frequency || 'Monthly',
                    paymentMethod: paymentMethod || null
                }
            });
            console.log(params);
            if (response.status === 200) {
                setAnalyticsData(response.data);
            } else {
                console.log('Oops, something went wrong!');
            }
        } catch (error) {
            console.log('Error fetching analytics data:', error);
        }
    };*/

        /*const handleGetAnalytics = async (username, startDate, endDate, frequency, paymentMethod) => {
        const { user, getUser } = useGetUser(username);
        useEffect(() => {
            getUser();
        }, [getUser]);
        //setFetchDataOnButtonClick(true);
        await getAnalyticsData(user, startDate, endDate, frequency, paymentMethod);
    };*/
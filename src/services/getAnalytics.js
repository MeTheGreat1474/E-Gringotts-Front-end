import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import {useGetUser} from "./getUser";

const toQueryString = (params) => {
    return '?' + Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
};

export const useGetAnalytics = (username) => {

    const { user, getUser } = useGetUser(username);
    useEffect(() => {
        getUser();
    }, [getUser]);
    // console.log(user?.userId)

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAnalytic= async () => {
            try {
                const response = await api.get(`/Transaction/api/analytics?userId=${user?.userId}`);

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
    }, [user]);

    return data;
};

export const useGetAnalyticsDate = (username, startDate, endDate) => {

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
};
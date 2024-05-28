// import { useState, useEffect } from "react";
// import api from "../api/axiosConfig";
// import {useGetUser} from "./getUser";
//
// export const useGetAnalyticsDate = (username, startDate, endDate) => {
//
//     const { user, getUser } = useGetUser(username);
//     useEffect(() => {
//         getUser();
//     }, [getUser]);
//     console.log(user?.userId)
//
//     const [data, setData] = useState([]);
//
//     useEffect(() => {
//         const fetchAnalytic= async () => {
//             try {
//                 // const response = await api.get(`/Transaction/api/analytics?userId=${user?.userId}&startDate=${startDate}&endDate=${endDate}`);
//                 const response = await api.get(`/Transaction/api/analytics?userId=663add009dfd4c1f900b6c1a&startDate=${startDate}&endDate=${endDate}`);
//
//                 if (response.status === 200) {
//                     setData(response.data);
//                 } else {
//                     console.log('Oops, we haven\'t got JSON!');
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//
//         fetchAnalytic();
//     }, [username, startDate, endDate]);
//
//     return data;
// };
//
// // For Frequency
// export const useGetAnalyticsFrequency = (username, frequency) => {
//
//     const { user, getUser } = useGetUser(username);
//     useEffect(() => {
//         getUser();
//     }, [getUser]);
//     console.log(user?.userId)
//
//     const [data, setData] = useState([]);
//
//     useEffect(() => {
//         const fetchAnalytic= async () => {
//             try {
//                 const params = {
//                     userId: user?.userId,
//                     frequency: frequency
//                 };
//                 const queryString = toQueryString(params);
//                 const response = await api.get(`/Transaction/api/analytics${queryString}`);
//
//                 if (response.status === 200) {
//                     setData(response.data);
//                 } else {
//                     console.log('Oops, we haven\'t got JSON!');
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//
//         fetchAnalytic();
//     }, [username, frequency]);
//
//     return data;
// };
//
// // For Category
// export const useGetAnalyticsCategory = (username, category) => {
//
//     const { user, getUser } = useGetUser(username);
//     useEffect(() => {
//         getUser();
//     }, [getUser]);
//     console.log(user?.userId)
//
//     const [data, setData] = useState([]);
//
//     useEffect(() => {
//         const fetchAnalytic= async () => {
//             try {
//                 const params = {
//                     userId: user?.userId,
//                     category: category
//                 };
//                 const queryString = toQueryString(params);
//                 const response = await api.get(`/Transaction/api/analytics${queryString}`);
//
//                 if (response.status === 200) {
//                     setData(response.data);
//                 } else {
//                     console.log('Oops, we haven\'t got JSON!');
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//
//         fetchAnalytic();
//     }, [username, category]);
//
//     return data;
// };

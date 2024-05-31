import React, { useState, useEffect } from 'react'
import { useGetUser } from '../../services/getUser';
import Navbar from "../Navbar";
import {useParams} from "react-router-dom";
import AnalyticContent from "../Analytics/AnalyticContent";
import AnalyticFilter from "../Analytics/AnalyticFilter";
import { useGetAnalyticsDefault } from '../../services/getAnalytics';

function Analytic() {
    const { username } = useParams();
    const { user, getUser } = useGetUser(username);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        getUser();
    }, [getUser]);
    useEffect(() => {
        if (user) {
            setUserId(user.userId);
        }
    }, [user]);
    console.log(userId);
    // Fetch default analytics data
    const analyticsDataDefault = useGetAnalyticsDefault(userId);
    const [analyticsData, setAnalyticsData] = useState([]);

    // Set initial analytics data once the default data is available
    useEffect(() => {
        if (analyticsDataDefault) {
            setAnalyticsData(analyticsDataDefault);
        }
    }, [analyticsDataDefault]);
    console.log(analyticsDataDefault);
    return (
        <div className="dashboard">
            <div className="left">
                <Navbar username={username}/>
            </div>
            <div className="middle">
                <AnalyticContent analyticsData={analyticsData}/>
            </div>
            <div className="right">
                <AnalyticFilter userId={userId} analyticsData={analyticsData} setAnalyticsData={setAnalyticsData}/>
            </div>
        </div>
    )
}

export default Analytic

/*import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar";
import {useParams} from "react-router-dom";
import AnalyticFilter from '../../components/Analytics/AnalyticFilter';
import AnalyticContent from '../../components/Analytics/AnalyticContent';
import { useGetAnalytics, useGetAnalyticsDefault } from '../../services/getAnalytics';
import { useGetUser } from '../../services/getUser';

function Analytic() {
    const { username } = useParams();
    const { user, getUser } = useGetUser(username);
    const [userId, setUserId] = useState(null);
    const [analyticsData, setAnalyticsData] = useState([]);
    const { fetchAnalytic } = useGetAnalyticsDefault();
    const { getAnalyticsData } = useGetAnalytics();

    useEffect(() => {
        getUser();
    }, [getUser]);

    useEffect(() => {
        if (user) {
            setUserId(user.userId);
        }
    }, [user]);

    useEffect(() => {
        const getAnalyticsDefault = async () => {
            if (userId) {
                const data = await fetchAnalytic(userId);
                setAnalyticsData(data);
            }
        };

        getAnalyticsDefault();
    }, [userId, fetchAnalytic]);

    const handleGetAnalytics = async (startDate, endDate, frequency, paymentMethod) => {
        const data = await getAnalyticsData(userId, startDate, endDate, frequency, paymentMethod);
        setAnalyticsData(data);
    };

    return (
        <div className="dashboard">
            <div className="left">
                <Navbar username={username}/>
            </div>
            <div className="middle">
                <AnalyticContent analyticsData={analyticsData}/>
            </div>
            <div className="right">
                <AnalyticFilter userId={userId} onGetAnalytics={handleGetAnalytics} />
            </div>
        </div>
    );
}

export default Analytic;*/



/*import React from 'react'
import Navbar from "../Navbar";
import {useParams} from "react-router-dom";
import AnalyticContent from "../Analytics/AnalyticContent";
import AnalyticFilter from "../Analytics/AnalyticFilter";

function Analytic() {
    const { username } = useParams();

    return (
        <div className="dashboard">
            <div className="left">
                <Navbar username={username}/>
            </div>
            <div className="middle">
                <AnalyticContent username={username}/>
            </div>
            <div className="right">
                <AnalyticFilter username={username}/>
            </div>
        </div>
    )
}

export default Analytic*/



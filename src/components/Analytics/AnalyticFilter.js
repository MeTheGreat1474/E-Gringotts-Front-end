import React, { useEffect, useState} from 'react'
import { useGetAnalytics } from '../../services/getAnalytics';
import './AnalyticFilter.css'
import {Button} from "../Button";
import { useGetUser } from '../../services/getUser';

function toQueryString(params) {
    return '?' + Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
}

function AnalyticFilter({username}) {
    const { user, getUser } = useGetUser(username);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        getUser();
    }, [getUser]);
    useEffect(() => {
        if (user && user.userId) {
            setUserId(user.userId);
        }
    }, [user]);
    //const [analyticsData, setAnalyticsData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [frequency, setFrequency] = useState("monthly");
    const [paymentMethod, setPaymentMethod] = useState(["credit-card", "debit-card", "transfer"]);

    /*const analyticsDataDefault = useGetAnalytics(username);
    const analyticsDataDate = useGetAnalyticsDate(username, startDate, endDate);
    const analyticsDataFrequency = useGetAnalyticsFrequency(username, frequency);
    const analyticsDataPaymentMethod = useGetAnalyticsPaymentMethod(username, paymentMethod);*/

    const { getAnalyticsData } = useGetAnalytics();
    const handleClick = async () => {
        // Call getAnalyticsData function with the necessary parameters
        await getAnalyticsData(userId, startDate, endDate, frequency, paymentMethod);
    };

    /*const { handleGetAnalytics } = useGetAnalytics(); // Using the custom hook to get the handleGetAnalytics function
    const handleClick = () => {
        // Call handleGetAnalytics function with the necessary parameters
        handleGetAnalytics(username, startDate, endDate, frequency, paymentMethod);
    };*/

    /*console.log('username:', username);
    console.log('analyticsData:', analyticsData);
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);
    console.log('frequency:', frequency);
    console.log('paymentMethod:', paymentMethod);
    console.log('analyticsDataDefault:', analyticsDataDefault);
    console.log('analyticsDataDate:', analyticsDataDate);
    console.log('analyticsDataFrequency:', analyticsDataFrequency);
    console.log('analyticsDataPaymentMethod:', analyticsDataPaymentMethod);*/

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    }
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    }
    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
    }
    const handlePaymentMethodChange = (e) => {
        const value = e.target.value;
        setPaymentMethod(prev =>
            prev.includes(value) ? prev.filter(cat => cat !== value) : [...prev, value]
        );
    }

    /*useEffect(() => {
        let fetchData;
        switch (filterType) {
            case 'default':
                fetchData = analyticsDataDefault;
                break;
            case 'date':
                if (startDate !== "" && endDate !== "") {
                    fetchData = analyticsDataDate;
                }
                break;
            case 'frequency':
                fetchData = analyticsDataFrequency;
                break;
            case 'paymentMethod':
                fetchData = analyticsDataPaymentMethod;
                break;
            default:
                fetchData = analyticsDataDefault;
        }
        if (fetchData) {
            setAnalyticsData(fetchData);
        }
    }, [filterType, startDate, endDate, frequency, paymentMethod, analyticsDataDefault, analyticsDataDate, analyticsDataFrequency, analyticsDataPaymentMethod]);*/

    return (
        <div className='analytic-filter-box'>
            <div className="title">
                <h1>FILTER</h1>
            </div>
            <div className="filter-container">
                <div className="date-filters">
                    <div>
                        <label htmlFor="start-date">Start Date:</label>
                        <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} placeholder="Start Date" />
                    </div>
                    <div>
                        <label htmlFor="end-date">End Date:</label>
                        <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} placeholder="End Date" />
                    </div>
                </div>
                <div className="frequency-filter">
                    <label htmlFor="frequency">Frequency:</label>
                    <select onChange={handleFrequencyChange} id="frequency" value={frequency}>
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
                <div className="paymentMethod-filters">
                    <label htmlFor="payment-method" className="filter-heading">Payment Method:</label>
                    <label>
                        <input type="checkbox" id="payment-method" value="credit-card" onChange={handlePaymentMethodChange} checked={paymentMethod.includes("credit-card")} />
                        Credit Card
                    </label>
                    <label>
                        <input type="checkbox" value="debit-card" onChange={handlePaymentMethodChange} checked={paymentMethod.includes("debit-card")} />
                        Debit Card
                    </label>
                    <label>
                        <input type="checkbox" value="transfer" onChange={handlePaymentMethodChange} checked={paymentMethod.includes("transfer")} />
                        Transfer
                    </label>
                </div>
                <div className="analytic-filter-button">
                <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large' onClick={handleClick}>Get Analytics</Button>
                </div>
            </div>
        </div>
    );
}

export default AnalyticFilter
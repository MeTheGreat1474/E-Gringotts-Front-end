import React from 'react'
import AnalyticContentLog from './AnalyticContentLog';
import './AnalyticContent.css'

function toQueryString(params) {
    return '?' + Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
}

function AnalyticContent({analyticsData}) {

    return (
        <div className='analytic-box'>
            <div className="title">
                <h1>DIVINATION DATA</h1>
            </div>
            <div className="analytic-content-box">
                <AnalyticContentLog analyticsData={analyticsData}/>
            </div>
        </div>
    );
}

export default AnalyticContent

/*import React from 'react';
import AnalyticContentLog from './AnalyticContentLog';
import './AnalyticContent.css';

function AnalyticContent({ analyticsData }) {
    if (!analyticsData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="analytic-box">
            <div className="title">
                <h1>ANALYTICS OF EXPENDITURE</h1>
            </div>
            <div className="analytic-content-box">
                <AnalyticContentLog analyticsData={analyticsData} />
            </div>
        </div>
    );
}

export default AnalyticContent;*/



/*import React, {useEffect, useState} from 'react'
import { useGetAnalyticsDefault } from '../../services/getAnalytics';
import AnalyticContentLog from './AnalyticContentLog';
import './AnalyticContent.css'
import { useGetUser } from '../../services/getUser';

function toQueryString(params) {
    return '?' + Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
}

function AnalyticContent({username}) {
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

    const analyticsData = useGetAnalyticsDefault(userId);

    if (!userId) {
        return <div>Loading...</div>;
    }

    return (
        <div className='analytic-box'>
            <div className="title">
                <h1>ANALYTICS OF EXPENDITURE</h1>
            </div>
            <div className="analytic-content-box">
                <AnalyticContentLog analyticsData={analyticsData}/>
            </div>
        </div>
    );
}

export default AnalyticContent*/



/*const filterRef = React.useRef();
    const [analyticsData, setAnalyticsData] = useState([]);
    const [filterType, setFilterType] = useState("default");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [frequency, setFrequency] = useState("monthly");
    const [paymentMethod, setPaymentMethod] = useState([]);

    const analyticsDataDefault = useGetAnalytics(username);
    const analyticsDataDate = useGetAnalyticsDate(username, startDate, endDate);
    const analyticsDataFrequency = useGetAnalyticsFrequency(username, frequency);
    const analyticsDataPaymentMethod = useGetAnalyticsPaymentMethod(username, paymentMethod);

    console.log('username:', username);
    console.log('filterRef:', filterRef);
    console.log('analyticsData:', analyticsData);
    console.log('filterType:', filterType);
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);
    console.log('frequency:', frequency);
    console.log('paymentMethod:', paymentMethod);
    console.log('analyticsDataDefault:', analyticsDataDefault);
    console.log('analyticsDataDate:', analyticsDataDate);
    console.log('analyticsDataFrequency:', analyticsDataFrequency);
    console.log('analyticsDataPaymentMethod:', analyticsDataPaymentMethod);
    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
    }
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

    useEffect(() => {
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
    }, [filterType, startDate, endDate, frequency, paymentMethod, analyticsDataDefault, analyticsDataDate, analyticsDataFrequency, analyticsDataPaymentMethod]);
    return (
        <div className='analytic-box'>
            <div className="title">
                <h1>ANALYTICS OF EXPENDITURE</h1>
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
                        <input type="checkbox" id="payment-method" value="credit-card" onChange={handlePaymentMethodChange} />
                        Credit Card
                    </label>
                    <label>
                        <input type="checkbox" value="debit-card" onChange={handlePaymentMethodChange} />
                        Debit Card
                    </label>
                    <label>
                        <input type="checkbox" value="transfer" onChange={handlePaymentMethodChange} />
                        Transfer
                    </label>
                </div>
            </div>
            <div className="analytic-content-box">
                <AnalyticContentLog analyticsData={analyticsData}/>
            </div>
        </div>
    );
    const [analyticsData, setAnalyticsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await useGetAnalyticsDefault(userId);
            setAnalyticsData(data);
        };

        fetchData();
    }, [userId]);     // Only re-run effect if username changes
    const [analyticsData, setAnalyticsData] = useState([]);
    const analyticsDataDefault = useGetAnalyticsDefault(username);
    setAnalyticsData(analyticsDataDefault);
    const { analyticsData } = useGetAnalyticsDefault(username); // Import and use the hook here*/
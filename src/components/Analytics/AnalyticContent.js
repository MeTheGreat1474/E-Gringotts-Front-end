import React, {useEffect, useState} from 'react'
import {
    useGetAnalytics,
    useGetAnalyticsCategory,
    useGetAnalyticsDate,
    useGetAnalyticsFrequency
} from '../../services/getAnalytics';
import AnalyticContentLog from './AnalyticContentLog';
import './AnalyticContent.css'

function AnalyticContent({username}) {
    const filterRef = React.useRef();
    const [analyticsData, setAnalyticsData] = useState([]);
    const [filterType, setFilterType] = useState("default");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [frequency, setFrequency] = useState("");
    const [category, setCategory] = useState("");

    const analyticsDataDefault = useGetAnalytics(username);
    const analyticsDataDate = useGetAnalyticsDate(username, startDate, endDate);
    const analyticsDataFrequency = useGetAnalyticsFrequency(username, frequency);
    const analyticsDataCategory = useGetAnalyticsCategory(username, category);


    console.log('username:', username);
    console.log('filterRef:', filterRef);
    console.log('analyticsData:', analyticsData);
    console.log('filterType:', filterType);
    console.log('startDate:', startDate);
    console.log('endDate:', endDate);
    console.log('frequency:', frequency);
    console.log('category:', category);
    console.log('analyticsDataDefault:', analyticsDataDefault);
    console.log('analyticsDataDate:', analyticsDataDate);
    console.log('analyticsDataFrequency:', analyticsDataFrequency);
    console.log('analyticsDataCategory:', analyticsDataCategory);

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
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
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
            case 'category':
                fetchData = analyticsDataCategory;
                break;
            default:
                fetchData = analyticsDataDefault;
        }
        if (fetchData) {
            setAnalyticsData(fetchData);
        }
    }, [filterType, startDate, endDate, frequency, category, analyticsDataDefault, analyticsDataDate, analyticsDataFrequency, analyticsDataCategory]);

    return (
        <div className='admin-box'>
            <div className="title">
                <h1>ANALYTIC</h1>
            </div>
            <div className="filter-container">
                <div className="dropdown-list">
                    <select onChange={handleFilterChange} ref={filterRef}>
                        <option value="default">Default</option>
                        <option value="date">Date</option>
                        <option value="frequency">Frequency</option>
                        <option value="category">Category</option>
                    </select>
                </div>
                {filterType === "date" && (
                    <div>
                        <input type="date" value={startDate} onChange={handleStartDateChange} />
                        <input type="date" value={endDate} onChange={handleEndDateChange} />
                    </div>
                )}
                {filterType === "frequency" && (
                    <select onChange={handleFrequencyChange}>
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                )}
                {filterType === "category" && (
                    <select onChange={handleCategoryChange}>
                        <option value="credit-card">Credit Card</option>
                        <option value="debit-card">Debit Card</option>
                        <option value="transfer">Transfer</option>
                        <option value="reload">Reload</option>
                    </select>
                )}
            </div>
            <div className="admin-content-box">
                <AnalyticContentLog analyticsData={analyticsData}/>
            </div>
        </div>
    )
}

export default AnalyticContent
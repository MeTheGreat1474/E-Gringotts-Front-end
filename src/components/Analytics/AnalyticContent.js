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
    const [frequency, setFrequency] = useState("monthly");
    const [category, setCategory] = useState([]);

    const analyticsDataDefault = useGetAnalytics(username);
    const analyticsDataDate = useGetAnalyticsDate(username, startDate, endDate);
    const analyticsDataFrequency = useGetAnalyticsFrequency(username, frequency);
    const analyticsDataCategory = useGetAnalyticsCategory(username, category);


    /*console.log('username:', username);
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
    console.log('analyticsDataCategory:', analyticsDataCategory);*/

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
        setCategory(prev =>
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
        <div className='analytic-box'>
            <div className="title">
                <h1>Analytics Of Expenditure</h1>
            </div>
            <div className="filter-container">
            <div className="date-filters">
                    <input type="date" value={startDate} onChange={handleStartDateChange} placeholder="Start Date" />
                    <input type="date" value={endDate} onChange={handleEndDateChange} placeholder="End Date" />
                </div>
                <div className="frequency-filter">
                    <select onChange={handleFrequencyChange} value={frequency}>
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <div className="category-filters">
                    <label>
                        <input type="checkbox" value="credit-card" onChange={handleCategoryChange} />
                        Credit Card
                    </label>
                    <label>
                        <input type="checkbox" value="debit-card" onChange={handleCategoryChange} />
                        Debit Card
                    </label>
                    <label>
                        <input type="checkbox" value="transfer" onChange={handleCategoryChange} />
                        Transfer
                    </label>
                    <label>
                        <input type="checkbox" value="reload" onChange={handleCategoryChange} />
                        Reload
                    </label>
                </div>
            </div>
            <div className="analytic-content-box">
                <AnalyticContentLog analyticsData={analyticsData}/>
            </div>
        </div>
    );
}

export default AnalyticContent
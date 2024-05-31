import React, {useEffect, useState} from 'react'
import {
    useGetAnalytics,
    useGetAnalyticsCategory,
    useGetAnalyticsDate, useGetAnalyticsDefault,
    useGetAnalyticsFrequency
} from '../../services/getAnalytics';
import AnalyticContentLog from './AnalyticContentLog';
import './AnalyticContent.css'

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Months are 0 based so add 1 and format to 2 digits
const day = ("0" + currentDate.getDate()).slice(-2); // Format to 2 digits

const formattedDate = `${year}-${month}-${day}`;

function AnalyticContent({username}) {
    const filterRef = React.useRef();
    const [analyticsData, setAnalyticsData] = useState([]);
    const [filterType, setFilterType] = useState("default");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [frequency, setFrequency] = useState("");
    const [category, setCategory] = useState("");

    const analyticsDataDefault = useGetAnalyticsDefault(username);
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
    // console.log('analyticsDataDefault:', analyticsDataDefault);
    // console.log('analyticsDataDate:', analyticsDataDate);
    // console.log('analyticsDataFrequency:', analyticsDataFrequency);
    // console.log('analyticsDataCategory:', analyticsDataCategory);

    const handleFilterChange = (e) => {
        setFilterType(e.target.value);
        resetFilters(e.target.value);

        if (e.target.value === "category") {
            setCategory("TRANSFER");
        }
        if (e.target.value === "frequency") {
            setFrequency("daily");
        }
        if (e.target.value === "date") {
            setStartDate("2000-01-01");
            setEndDate(formattedDate)
        }
    }
    const resetFilters = (selectedFilter) => {
        if (selectedFilter !== "date") {
            setStartDate(null);
            setEndDate(null);
        }
        if (selectedFilter !== "frequency") {
            setFrequency(null);
        }
        if (selectedFilter !== "category") {
            setCategory(null);
        }
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
                    <select value={frequency} onChange={handleFrequencyChange}>
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                )}
                {filterType === "category" && (
                    <select value={category} onChange={handleCategoryChange}>
                        <option value="CREDIT CARD">Credit Card</option>
                        <option value="DEBIT CARD">Debit Card</option>
                        <option value="TRANSFER">Transfer</option>
                        <option value="RELOAD">Reload</option>
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
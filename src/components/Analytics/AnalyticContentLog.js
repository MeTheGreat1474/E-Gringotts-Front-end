/*import React from 'react';

function AnalyticContentLog({ analyticsData }) {
    if (!analyticsData) {
        return <div>Analytics data is undefined or null: {analyticsData}</div>; // Return analyticsData for debugging
    }
    return (
        <>
            {Object.entries(analyticsData).map(([date, data]) => (
                <div key={date} className="date-container">
                    <h4>{date}:</h4>
                    {Object.entries(data).map(([category, categoryData]) => (
                        <div key={category} className="analytic-content-container">
                            <h3>{category}</h3>
                            <p>Percentage: {categoryData.Percentage}</p>
                            <p>Total Expenditure: {categoryData["Total Expenditure"]}</p>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
}

export default AnalyticContentLog;*/

/*import React, { useState } from 'react';

function AnalyticContentLog({ analyticsData }) {
    const [selectedDate, setSelectedDate] = useState('');

    if (!analyticsData) {
        return <div>Analytics data is undefined or null: {analyticsData}</div>; // Return analyticsData for debugging
    }

    const dates = Object.keys(analyticsData);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    return (
        <>
            <div>
                <label htmlFor="date-select">Select a date:</label>
                <select id="date-select" value={selectedDate} onChange={handleDateChange}>
                    <option value="">--Select a date--</option>
                    {dates.map((date) => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </select>
            </div>

            {selectedDate && analyticsData[selectedDate] && (
                <div className="date-container">
                    <h4>{selectedDate}:</h4>
                    {Object.entries(analyticsData[selectedDate]).map(([category, categoryData]) => (
                        <div key={category} className="analytic-content-container">
                            <h3>{category}</h3>
                            <p>Percentage: {categoryData.Percentage}</p>
                            <p>Total Expenditure: {categoryData["Total Expenditure"]}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default AnalyticContentLog;*/

/*import React, { useState } from 'react';

function AnalyticContentLog({ analyticsData }) {
    const [selectedDate, setSelectedDate] = useState('');

    if (!analyticsData) {
        return <div>Analytics data is undefined or null: {analyticsData}</div>; // Return analyticsData for debugging
    }

    const dates = Object.keys(analyticsData);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    return (
        <>
            <div className="date-select-container">
                <label htmlFor="date-select">Select a date:</label>
                <select id="date-select" value={selectedDate} onChange={handleDateChange}>
                    <option value="">--Select a date--</option>
                    {dates.map((date) => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </select>
            </div>

            {selectedDate && analyticsData[selectedDate] && (
                <div className="date-container">
                    <h4>{selectedDate}:</h4>
                    {Object.entries(analyticsData[selectedDate]).map(([category, categoryData]) => (
                        <div key={category} className="analytic-content-container">
                            <h3>{category}</h3>
                            <p>Percentage: {categoryData.Percentage}</p>
                            <p>Total Expenditure: {categoryData["Total Expenditure"]}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default AnalyticContentLog;*/

/*import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function AnalyticContentLog({ analyticsData }) {
    const [selectedDate, setSelectedDate] = useState('');

    if (!analyticsData) {
        return <div>Analytics data is undefined or null: {analyticsData}</div>; // Return analyticsData for debugging
    }

    const dates = Object.keys(analyticsData);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4567', '#AA00FF'];

    const data = selectedDate ? Object.entries(analyticsData[selectedDate]).map(([category, categoryData]) => ({
        name: category,
        value: categoryData.Percentage,
        expenditure: categoryData["Total Expenditure"]
    })) : [];

    return (
        <>
            <div className="date-select-container">
                <label htmlFor="date-select">Select a date:</label>
                <select id="date-select" value={selectedDate} onChange={handleDateChange}>
                    <option value="">--Select a date--</option>
                    {dates.map((date) => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </select>
            </div>

            {selectedDate && (
                <div className="chart-container">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => [`Expenditure: ${props.payload.expenditure}`, `Percentage: ${value}%`]} />
                        <Legend />
                    </PieChart>
                </div>
            )}
        </>
    );
}

export default AnalyticContentLog;*/

import React, { useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';

function AnalyticContentLog({ analyticsData }) {
    const [selectedDate, setSelectedDate] = useState('');

    if (!analyticsData) {
        return <div>Analytics data is undefined or null: {analyticsData}</div>; // Return analyticsData for debugging
    }

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4567', '#AA00FF'];

    const data = selectedDate && analyticsData[selectedDate] ? Object.entries(analyticsData[selectedDate]).map(([category, categoryData]) => ({
        name: category,
        value: categoryData.Percentage,
        expenditure: categoryData["Total Expenditure"]
    })) : [];

    //const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA64A4'];

    return (
        <>
            <div className="date-select-container">
                <label htmlFor="date-select">Select a date:</label>
                <select id="date-select" value={selectedDate} onChange={handleDateChange}>
                    <option value="">--Select a date--</option>
                    {Object.keys(analyticsData).map(date => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </select>
            </div>
            {selectedDate && (
                <div className="chart-container">
                    {data.length > 0 ? (
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data}
                                cx={200}
                                cy={200}
                                labelLine={false}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value, name, props) => [`Expenditure: ${props.payload.expenditure}`, `Percentage: ${value}%`]} />
                            <Legend />
                        </PieChart>
                    ) : (
                        <p>Please select a date to view analytics.</p>
                    )}
                </div>
            )}
            {selectedDate && analyticsData[selectedDate] && (
                <div className="date-container">
                    <h4>{selectedDate}:</h4>
                    {Object.entries(analyticsData[selectedDate]).map(([category, categoryData]) => (
                        <div key={category} className="analytic-content-container">
                            <h3>{category}</h3>
                            <p>Percentage: {categoryData.Percentage}</p>
                            <p>Total Expenditure: {categoryData["Total Expenditure"]}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default AnalyticContentLog;

import React from 'react';

function AnalyticContentLog({ analyticsData }) {
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

export default AnalyticContentLog;
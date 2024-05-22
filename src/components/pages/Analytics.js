// components/pages/Analytics.js
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { fetchAnalyticsData } from '../services/analyticsService';

const Analytics = ({ data, userId, startDate, endDate, frequency, setFrequency, setStartDate, setEndDate, paymentMethods, setPaymentMethods }) => {
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchAnalyticsData({ userId, startDate, endDate, frequency, paymentMethods })
      .then((data) => setAnalyticsData(data))
      .catch((error) => console.error('Error fetching analytics data:', error));
  };

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Category Percentages',
        data: Object.values(data).map((values) => values[0]),
        backgroundColor: [
          '#FF6384', // Red
          '#36A2EB', // Blue
          '#FFCE56', // Yellow
          '#4BC0C0', // Cyan
          '#9966FF', // Purple
          '#FF9F40'  // Orange
        ],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const category = context.label;
            const percentage = context.parsed;
            const expenditure = data[category][1];
            return `${category}: ${percentage}% (${expenditure.toFixed(2)} Expenditure)`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h1>Analytics</h1>
      <form onSubmit={handleFilterSubmit}>
        <div>
          <label>
            Start Date:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label>
            End Date:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Frequency:
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Payment Methods:
            <select multiple value={paymentMethods} onChange={(e) => setPaymentMethods(Array.from(e.target.selectedOptions, option => option.value))}>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Online Transfer">Online Transfer</option>
            </select>
          </label>
        </div>
        <button type="submit">Filter</button>
      </form>
      <div>
        <label>
          Select Month:
          <select value={selectedMonth} onChange={handleMonthChange}>
            {Object.keys(data).map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>
      </div>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default Analytics;

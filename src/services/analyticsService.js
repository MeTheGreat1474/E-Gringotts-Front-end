// components/services/analyticsService.js
import api from "../api/axiosConfig";

export const fetchAnalyticsData = async (params) => {
  const queryParams = new URLSearchParams(params).toString();
  const response = await api.get(`/api/analytics?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch analytics data');
  }
  return response.data;
};
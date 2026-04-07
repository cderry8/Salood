import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useSchedule = () => {
  const { api } = useAuth();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSchedule = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/schedule');
      if (response.data.success) {
        setSchedule(response.data.data.schedule);
      }
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch schedule');
    } finally {
      setLoading(false);
    }
  }, [api]);

  const updateSchedule = useCallback(async (updates) => {
    try {
      setLoading(true);
      const response = await api.put('/schedule', updates);
      if (response.data.success) {
        setSchedule(response.data.data.schedule);
      }
      setError(null);
      return response.data.data.schedule;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update schedule';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const updateDaySchedule = useCallback(async (day, updates) => {
    try {
      setLoading(true);
      const response = await api.put(`/schedule/day/${day}`, updates);
      if (response.data.success) {
        setSchedule(prev => ({
          ...prev,
          schedule: {
            ...prev.schedule,
            [day]: response.data.data.schedule
          }
        }));
      }
      setError(null);
      return response.data.data.schedule;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update day schedule';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  return {
    schedule,
    loading,
    error,
    fetchSchedule,
    updateSchedule,
    updateDaySchedule
  };
};

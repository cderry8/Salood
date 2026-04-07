import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useBookings = () => {
  const { api } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailableSlots = useCallback(async (serviceId, date) => {
    if (!serviceId || !date) {
      setAvailableSlots([]);
      return [];
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/bookings/available-slots', {
        params: { serviceId, date }
      });

      if (response.data.success) {
        setAvailableSlots(response.data.data.slots);
        return response.data.data.slots;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch available slots';
      setError(message);
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  }, [api]);

  const createBooking = useCallback(async (bookingData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/bookings', bookingData);
      if (response.data.success) {
        return response.data.data.booking;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create booking';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const fetchUserBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/bookings/my-bookings');
      if (response.data.success) {
        setBookings(response.data.data.bookings);
        return response.data.data.bookings;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch bookings';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [api]);

  const fetchAllBookings = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/bookings/admin/all', { params: filters });
      if (response.data.success) {
        setBookings(response.data.data.bookings);
        return response.data.data.bookings;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch bookings';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [api]);

  const cancelBooking = useCallback(async (bookingId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put(`/bookings/${bookingId}/cancel`);
      if (response.data.success) {
        setBookings(prev => prev.map(b => 
          b._id === bookingId ? { ...b, status: 'cancelled' } : b
        ));
        return response.data.data.booking;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to cancel booking';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  const updateBookingStatus = useCallback(async (bookingId, status) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.put(`/bookings/${bookingId}/status`, { status });
      if (response.data.success) {
        setBookings(prev => prev.map(b => 
          b._id === bookingId ? { ...b, status } : b
        ));
        return response.data.data.booking;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update booking status';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api]);

  return {
    bookings,
    availableSlots,
    loading,
    error,
    fetchAvailableSlots,
    createBooking,
    fetchUserBookings,
    fetchAllBookings,
    cancelBooking,
    updateBookingStatus
  };
};

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'salood_booking'

export function useBookingStore() {
  const [booking, setBooking] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (booking) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(booking))
    }
  }, [booking])

  const clearBooking = () => {
    localStorage.removeItem(STORAGE_KEY)
    setBooking(null)
  }

  return { booking, setBooking, clearBooking }
}

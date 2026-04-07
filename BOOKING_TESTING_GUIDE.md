# Booking Feature - Testing & Usage Guide

## What Was Implemented

### Complete Booking System with:
1. **Dynamic Time Slot Availability** - Slots are generated based on:
   - Service duration (e.g., 45 min service shows 45-min time blocks)
   - Admin-configured slot interval (default 30 min)
   - Admin working hours per day (Monday-Sunday)
   - Existing bookings (no overlaps)

2. **Admin Schedule Management** - Configure per-day working hours:
   - Toggle working/off days
   - Set start and end times for each day
   - Configure slot duration (15-240 minutes)

3. **User Booking Flow**:
   - Select service → Pick date → See available times → Book → Pay

4. **Admin Booking Management**:
   - View all bookings
   - Filter by status and date
   - Update booking status (pending → confirmed → completed)
   - See customer details

## Quick Start - Testing the Feature

### 1. Setup Backend
```bash
cd backend
npm install  # If not already done
npm run dev  # Start the server
```

### 2. Setup Frontend
```bash
cd Client
npm install  # If not already done
npm run dev  # Start the dev server
```

### 3. Test as Regular User
1. Navigate to Services page (e.g., `/services`)
2. Click on any service → Click "Book service"
3. Select a date on the calendar
4. See available time slots automatically populate based on:
   - Service duration
   - Admin working hours for that day
5. Select a time slot
6. Optionally add notes
7. Click "Confirm Booking"
8. You'll be directed to payment page
9. View your bookings in User Dashboard

### 4. Test as Admin
1. Log in with admin account
2. Go to "Admin" section
3. Visit "Manage Schedule" page:
   - Set working days (toggle Monday-Saturday)
   - Set hours (e.g., 09:00-17:00)
   - Set slot interval (e.g., 30 minutes)
   - Save each day
4. Visit "Manage Bookings" page:
   - See all bookings created by users
   - Filter by status or date
   - Change booking status
   - View customer information

## Feature Details

### Time Slot Calculation Example
**Service:** Haircut (45 minutes)
**Admin Schedule:** 
- Monday: 09:00-17:00
- Slot Interval: 30 minutes

**Available Slots for Monday:**
- 09:00-09:45 ✓
- 09:30-10:15 ✓
- 10:00-10:45 ✓
- ... (continues every 30 min)
- 16:15-17:00 ✓
- 16:30-17:15 ✗ (overlaps end time)

**If 09:00-09:45 is already booked:**
- 09:00-09:45 ✗ (conflicts)
- 09:30-10:15 ✗ (overlaps with booked slot)
- 10:00-10:45 ✓ (first available)

### API Endpoints Reference

#### Public Endpoints
```
GET /api/bookings/available-slots?serviceId=XXX&date=2026-04-15
  Returns: { slots: [{ startTime, endTime }, ...], serviceDuration: 45 }

GET /api/schedule
  Returns: { schedule: { monday: {...}, tuesday: {...}, ... } }
```

#### User Endpoints (Authenticated)
```
POST /api/bookings
  Body: { serviceId, date, startTime, notes }
  Returns: { booking: {...} }

GET /api/bookings/my-bookings
  Returns: { bookings: [...] }

PUT /api/bookings/:id/cancel
  Returns: { booking: {...} }
```

#### Admin Endpoints
```
GET /api/bookings/admin/all?status=pending&date=2026-04-15
  Returns: { bookings: [...] }

PUT /api/schedule
  Body: { schedule: { monday: { isWorking, startTime, endTime }, ... } }
  Returns: { schedule: {...} }

PUT /api/schedule/day/monday
  Body: { isWorking: true, startTime: "09:00", endTime: "17:00" }
  Returns: { schedule: {...} }

PUT /api/bookings/:id/status
  Body: { status: "confirmed" }
  Returns: { booking: {...} }
```

## User Flow Diagram

```
User visits Services
    ↓
Clicks service → Goes to ServiceDetailsPage
    ↓
Clicks "Book service" → Goes to BookingPage with serviceId
    ↓
Selects date on calendar
    ↓
BookingPage fetches /api/bookings/available-slots
    ↓
Backend:
  - Gets admin schedule for that day
  - Gets all bookings for that day
  - Calculates available slots respecting:
    * Service duration
    * Admin hours
    * Existing bookings
    ↓
Returns slots array
    ↓
User selects time slot and confirms
    ↓
BookingPage calls POST /api/bookings
    ↓
Booking created in database
    ↓
User redirected to PaymentPage
    ↓
Payment → TicketPage → Dashboard
    ↓
Booking appears in "My Dashboard"
```

## Admin Schedule Setup Flow

```
Admin visits AdminSchedulePage
    ↓
For each day of week:
  - Toggles "Is Working" checkbox
  - If working:
    * Sets start time (e.g., 09:00)
    * Sets end time (e.g., 17:00)
    * Clicks Save
    ↓
AdminSchedulePage calls PUT /api/schedule/day/:day
    ↓
Backend updates AdminSchedule model
    ↓
Success message shown
    ↓
These hours now apply to all future slot calculations
```

## Common Scenarios

### Scenario 1: Service Takes Longer Than Slot Interval
- Service: 90 minutes
- Slot Interval: 30 minutes
- Hours: 09:00-17:00

Available slots:
- 09:00-10:30 ✓
- 09:30-11:00 ✓
- 10:00-11:30 ✓
- ... (continues every 30 min as long as slot + duration fits)
- 15:30-17:00 ✓

### Scenario 2: Admin Closes on Weekends
- Sunday: isWorking = false
- User tries to book on Sunday
- BookingPage fetches /api/bookings/available-slots?date=2026-04-13 (Sunday)
- Backend returns: { slots: [], message: "Not available on this day" }
- UI shows: "No available slots for this date"

### Scenario 3: Double Booking Prevention
1. User A books 14:00-15:00 on Monday
2. Booking saved to database with status: "pending"
3. User B tries to book 14:30-15:30 on same Monday
4. Backend checks for conflicting bookings
5. Backend finds User A's booking: 14:00-15:00
6. Time ranges overlap (14:30 is between 14:00-15:00)
7. API returns error: "Time slot is already booked"
8. UI shows error message to User B

## Database Considerations

### Booking Collection
- Keep indexes on: date, service, user
- Useful for: finding bookings by specific date or service

### AdminSchedule Collection
- One document per admin
- Updates per-day should be atomic
- Consider timezone conversions for multi-region support

## Performance Notes

- Slot calculation: O(hours * 60 / slot_interval) - very fast
- Available slot checks against bookings: O(bookings_that_day) - minimal
- Suitable for hundreds of bookings per day

## Error Handling

All errors return consistent format:
```json
{
  "success": false,
  "message": "User-friendly error message"
}
```

### Common Error Codes
- 400: Invalid parameters or time conflict
- 401: Not authenticated
- 403: Not authorized (e.g., non-admin accessing admin endpoint)
- 404: Booking or service not found
- 500: Server error

## Future Enhancements Configured

The system is designed to support:
- Multiple stylists/service providers (add provider field to Booking)
- Timezone support (already in AdminSchedule model)
- Service-specific hours (override admin hours per service)
- Buffer time between services
- Rush booking premium pricing
- Automated cancellation reminders

## Troubleshooting

### Issue: No available slots shown
1. Check admin schedule - is that day set to "working"?
2. Check working hours - is the current time within range?
3. Check service duration - does it fit in available hours?
4. Check existing bookings - all slots might be booked

### Issue: Booking creation fails
1. Verify auth token is valid
2. Check service exists and has valid duration
3. Verify date is in correct format (YYYY-MM-DD)
4. Ensure startTime is one of the available slots

### Issue: Admin schedule not updating
1. Verify you're logged in as admin
2. Check that start time < end time
3. Verify time format is HH:MM

## Testing Checklist

- [ ] Can book a service successfully
- [ ] Available slots respect service duration
- [ ] Available slots respect admin working hours
- [ ] Cannot book outside working hours
- [ ] Cannot book overlapping times
- [ ] Can see user's bookings in dashboard
- [ ] Can cancel booking as user
- [ ] Can see all bookings as admin
- [ ] Can change booking status as admin
- [ ] Admin can modify working hours
- [ ] Slot interval changes affect available slots
- [ ] Notes save correctly with booking
- [ ] Error messages display for invalid inputs

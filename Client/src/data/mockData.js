export const categories = [
  { id: 'haircut', name: 'Haircut', icon: '✂️' },
  { id: 'hair-styling', name: 'Hair Styling', icon: '💇' },
  { id: 'nails', name: 'Nails', icon: '💅' },
  { id: 'spa', name: 'Spa', icon: '🧖' },
  { id: 'barber', name: 'Barber', icon: '🧔' },
]

export const services = [
  { id: 'sv1', category: 'haircut', name: 'Precision Cut', emoji: '✂️', price: 18000, duration: 45, description: 'Sharp tailoring with face-shape mapping and premium finish.', image: 'https://images.unsplash.com/photo-1512690459411-b0fd1c86b8b8?auto=format&fit=crop&w=1200&q=80' },
  { id: 'sv2', category: 'haircut', name: 'Layered Refresh', emoji: '✨', price: 22000, duration: 60, description: 'Movement-focused layered haircut session for natural volume.', image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80' },
  { id: 'sv3', category: 'hair-styling', name: 'Event Styling', emoji: '💫', price: 30000, duration: 70, description: 'Premium styling for events, shoots, and bridal moments.', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80' },
  { id: 'sv4', category: 'hair-styling', name: 'Silk Blowout', emoji: '💨', price: 25000, duration: 50, description: 'Glossy blowout with anti-frizz and long-lasting smoothness.', image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1200&q=80' },
  { id: 'sv5', category: 'nails', name: 'Gel Manicure', emoji: '💅', price: 15000, duration: 40, description: 'Long-lasting gel application with modern color palette.', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80' },
  { id: 'sv6', category: 'nails', name: 'Luxury Nail Art', emoji: '🎨', price: 28000, duration: 75, description: 'Custom art designs and intricate premium nail detailing.', image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=80' },
  { id: 'sv7', category: 'spa', name: 'Glow Facial', emoji: '🌿', price: 32000, duration: 60, description: 'Hydration-focused cleansing ritual with brightening mask.', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80' },
  { id: 'sv8', category: 'spa', name: 'Deep Tissue Ritual', emoji: '🕯️', price: 45000, duration: 90, description: 'Tension-release body treatment for deep relaxation.', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80' },
  { id: 'sv9', category: 'barber', name: 'Beard Sculpt', emoji: '🧔', price: 12000, duration: 30, description: 'Beard shape, line-up, and conditioning treatment.', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80' },
  { id: 'sv10', category: 'barber', name: 'Classic Gentleman Cut', emoji: '🧴', price: 20000, duration: 45, description: 'Classic precision cut with hot towel finish.', image: 'https://images.unsplash.com/photo-1503951458645-643d53dffb2a?auto=format&fit=crop&w=1200&q=80' },
]

export const testimonials = [
  { id: 1, name: 'Arielle K.', role: 'Product Designer', text: 'The smoothest booking flow I have seen in a service app. Premium feel all the way.' },
  { id: 2, name: 'Jon M.', role: 'Consultant', text: 'Fast, polished, and super clear from booking to ticket confirmation.' },
  { id: 3, name: 'Yara B.', role: 'Entrepreneur', text: 'The futuristic UI makes Salood feel like a luxury concierge platform.' },
]

export const team = [
  { id: 1, name: 'Aline Uwimana', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Kevin Mutesi', role: 'Senior Barber', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Jeanne Mukamana', role: 'Spa Specialist', image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80' },
]

export const salonGallery = [
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1200&q=80',
]

export const timeSlots = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
]

export const initialBookings = [
  { id: 'BKG-1029', serviceId: 'sv3', date: '2026-04-10', time: '14:00', status: 'Upcoming', amount: 30000 },
  { id: 'BKG-9482', serviceId: 'sv7', date: '2026-03-15', time: '11:00', status: 'Completed', amount: 32000 },
]

export const transactions = [
  { id: 'TRX-301', bookingId: 'BKG-1029', method: 'Card', amount: 30000, status: 'Paid' },
  { id: 'TRX-302', bookingId: 'BKG-9482', method: 'Mobile Money', amount: 32000, status: 'Paid' },
  { id: 'TRX-303', bookingId: 'BKG-9551', method: 'Card', amount: 20000, status: 'Refunded' },
]

export const adminStats = {
  totalBookings: 324,
  revenue: 18640000,
  activeUsers: 118,
}

export const schedule = {
  openHours: '08:00 - 20:00',
  slotDuration: '30 mins',
  timezone: 'GMT+3',
}

export const salonInfo = {
  name: 'Salood Premium Studio',
  phone: '+250 788 123 456',
  email: 'hello@salood.rw',
  address: 'KG 11 Ave, Kigali, Rwanda',
  socials: [
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'X', url: 'https://x.com' },
  ],
}

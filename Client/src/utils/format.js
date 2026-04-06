/** Used when a service has no image URL yet */
export const SERVICE_IMAGE_PLACEHOLDER =
  'https://images.unsplash.com/photo-1512690459411-b0fd1c86b8b8?auto=format&fit=crop&w=1200&q=80'

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0,
  }).format(value)

export const generateTicketId = () => `TKT-${Math.floor(100000 + Math.random() * 900000)}`

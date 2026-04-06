export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0,
  }).format(value)

export const generateTicketId = () => `TKT-${Math.floor(100000 + Math.random() * 900000)}`

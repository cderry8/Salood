const defaultCategories = [
  { name: 'Haircut', slug: 'haircut', icon: '✂️' },
  { name: 'Hair Styling', slug: 'hair-styling', icon: '💇' },
  { name: 'Nails', slug: 'nails', icon: '💅' },
  { name: 'Spa', slug: 'spa', icon: '🧖' },
  { name: 'Barber', slug: 'barber', icon: '🧔' },
];

const defaultServices = [
  {
    categorySlug: 'haircut',
    name: 'Precision Cut',
    emoji: '✂️',
    price: 18000,
    duration: 45,
    description: 'Sharp tailoring with face-shape mapping and premium finish.',
    image:
      'https://images.unsplash.com/photo-1512690459411-b0fd1c86b8b8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    categorySlug: 'haircut',
    name: 'Layered Refresh',
    emoji: '✨',
    price: 22000,
    duration: 60,
    description: 'Movement-focused layered haircut session for natural volume.',
    image:
      'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    categorySlug: 'hair-styling',
    name: 'Event Styling',
    emoji: '💫',
    price: 30000,
    duration: 70,
    description: 'Premium styling for events, shoots, and bridal moments.',
    image:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    categorySlug: 'hair-styling',
    name: 'Silk Blowout',
    emoji: '💨',
    price: 25000,
    duration: 50,
    description: 'Glossy blowout with anti-frizz and long-lasting smoothness.',
    image:
      'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1200&q=80',
  },
  {
    categorySlug: 'nails',
    name: 'Gel Manicure',
    emoji: '💅',
    price: 15000,
    duration: 40,
    description: 'Long-lasting gel application with modern color palette.',
    image:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80',
  },
];

module.exports = {
  defaultCategories,
  defaultServices,
};

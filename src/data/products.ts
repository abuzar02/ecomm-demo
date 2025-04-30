
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  stock: number;
  featured: boolean;
  new: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 129.99,
    description: 'Premium wireless headphones with noise cancellation technology, offering crystal-clear sound quality and 20 hours of battery life.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    rating: 4.5,
    stock: 15,
    featured: true,
    new: false,
  },
  {
    id: '2',
    name: 'Smartphone XS Max',
    price: 899.99,
    description: 'Latest smartphone with a 6.5-inch OLED display, 5G connectivity, and an advanced camera system for professional-quality photos and videos.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    rating: 4.8,
    stock: 10,
    featured: true,
    new: true,
  },
  {
    id: '3',
    name: 'Ultra HD Smart TV 55"',
    price: 699.99,
    description: 'Smart TV with 4K resolution, built-in streaming apps, and voice control for an immersive home entertainment experience.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    rating: 4.3,
    stock: 7,
    featured: false,
    new: false,
  },
  {
    id: '4',
    name: 'Designer Leather Backpack',
    price: 79.99,
    description: 'Stylish and durable leather backpack with multiple compartments, perfect for daily commutes or weekend getaways.',
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    rating: 4.6,
    stock: 20,
    featured: true,
    new: false,
  },
  {
    id: '5',
    name: 'Smart Fitness Watch',
    price: 199.99,
    description: 'Advanced fitness tracker that monitors heart rate, sleep, and physical activity, with GPS and smartphone notifications.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    rating: 4.7,
    stock: 12,
    featured: true,
    new: true,
  },
  {
    id: '6',
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    description: 'Eco-friendly, double-walled insulated water bottle that keeps beverages cold for 24 hours or hot for 12 hours.',
    category: 'lifestyle',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    rating: 4.4,
    stock: 30,
    featured: false,
    new: true,
  },
  {
    id: '7',
    name: 'Professional DSLR Camera',
    price: 1299.99,
    description: 'High-performance digital camera with a 24.2MP sensor, 4K video recording, and interchangeable lenses for professional photography.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    rating: 4.9,
    stock: 5,
    featured: true,
    new: false,
  },
  {
    id: '8',
    name: 'Organic Skincare Set',
    price: 89.99,
    description: 'Complete skincare routine with natural, cruelty-free ingredients for radiant and healthy skin.',
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    rating: 4.2,
    stock: 15,
    featured: false,
    new: true,
  },
  {
    id: '9',
    name: 'Ergonomic Office Chair',
    price: 249.99,
    description: 'Comfortable and supportive office chair with adjustable features for proper posture and reduced back pain during long work hours.',
    category: 'furniture',
    image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    rating: 4.5,
    stock: 8,
    featured: false,
    new: false,
  },
  {
    id: '10',
    name: 'Portable Bluetooth Speaker',
    price: 59.99,
    description: 'Compact and waterproof speaker with powerful sound, perfect for outdoor adventures or home use.',
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    rating: 4.1,
    stock: 18,
    featured: true,
    new: false,
  },
  {
    id: '11',
    name: 'Gourmet Coffee Maker',
    price: 149.99,
    description: 'Programmable coffee machine with customizable brewing options for the perfect cup of coffee every morning.',
    category: 'home',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    rating: 4.6,
    stock: 10,
    featured: false,
    new: true,
  },
  {
    id: '12',
    name: 'Yoga Mat Premium',
    price: 45.99,
    description: 'Non-slip, eco-friendly yoga mat with optimal cushioning for comfortable practice and improved stability.',
    category: 'fitness',
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    rating: 4.3,
    stock: 25,
    featured: false,
    new: false,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.new);
};

export const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home & Kitchen' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'fitness', name: 'Fitness' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'lifestyle', name: 'Lifestyle' },
];

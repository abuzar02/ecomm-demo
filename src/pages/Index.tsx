
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import { getFeaturedProducts, getNewArrivals } from '@/data/products';

const Index: React.FC = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-shop-purple to-shop-dark-purple py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Discover Amazing Products for Every Need
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                Shop the latest trends and innovative products with fast delivery and unbeatable prices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-white text-shop-purple hover:bg-gray-100">
                  <Link to="/products">
                    Shop Now
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className=" border-white hover:bg-white/10">
                  <Link to="/products">
                    View Deals
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=2070" 
                alt="Shopping"
                className="rounded-lg shadow-xl max-w-full h-auto object-cover"
                style={{ maxHeight: '480px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=500", color: "shop-soft-blue" },
              { name: "Fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=500", color: "shop-soft-yellow" },
              { name: "Home & Kitchen", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=500", color: "shop-soft-green" },
              { name: "Beauty", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=500", color: "shop-soft-orange" },
            ].map((category, index) => (
              <Link 
                to={`/category/${category.name.toLowerCase()}`} 
                key={index}
                className="group relative rounded-lg overflow-hidden h-48 bg-gray-100 flex items-center justify-center product-card-shadow"
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                <h3 className="text-white text-xl font-bold relative z-10">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link 
              to="/products" 
              className="text-shop-purple hover:text-shop-dark-purple font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Link 
              to="/products" 
              className="text-shop-purple hover:text-shop-dark-purple font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-shop-light-purple rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Offer</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Get up to 50% off on selected items. Limited time offer!
                </p>
                <Button asChild className="bg-shop-purple hover:bg-shop-dark-purple text-white w-fit">
                  <Link to="/products">Shop Now</Link>
                </Button>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=870" 
                  alt="Special Offer" 
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Fast Shipping",
                description: "Free delivery on orders over $50",
                icon: (
                  <svg className="w-10 h-10 text-shop-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                )
              },
              {
                title: "Easy Returns",
                description: "30-day return policy for all items",
                icon: (
                  <svg className="w-10 h-10 text-shop-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                  </svg>
                )
              },
              {
                title: "Secure Payment",
                description: "Multiple secure payment methods",
                icon: (
                  <svg className="w-10 h-10 text-shop-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: "24/7 Support",
                description: "Customer support available anytime",
                icon: (
                  <svg className="w-10 h-10 text-shop-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

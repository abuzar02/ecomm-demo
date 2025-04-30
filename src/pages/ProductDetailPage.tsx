
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Rating from '@/components/Rating';
import { useCart } from '@/context/CartContext';
import { useToast } from "@/hooks/use-toast";
import { getProductById, Product } from '@/data/products';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get the product from the mock data
  const product = id ? getProductById(id) : null;
  
  // Generate additional images for the gallery (in a real app, these would come from the database)
  const additionalImages = product ? [
    product.image,
    'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600',
  ] : [];
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && product && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
      
      toast({
        title: "Added to cart",
        description: `${product.name} (${quantity}) has been added to your cart.`,
      });
    }
  };
  
  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
            <img 
              src={additionalImages[currentImageIndex]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {additionalImages.map((img, index) => (
              <button
                key={index}
                className={`aspect-square rounded-md overflow-hidden border-2 ${currentImageIndex === index ? 'border-shop-purple' : 'border-transparent'}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img 
                  src={img} 
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <Rating value={product.rating} size="lg" />
            <span className="ml-2 text-sm text-gray-500">(132 reviews)</span>
          </div>
          
          <div className="mb-6">
            <span className="text-3xl font-bold text-shop-purple">${product.price.toFixed(2)}</span>
            {product.price < 100 && (
              <span className="ml-2 text-sm text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
            )}
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Availability</h2>
            <p className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
          </div>
          
          {product.stock > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Quantity</h2>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="bg-gray-200 px-3 py-2 rounded-l-md"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-16 text-center border-t border-b border-gray-300 py-2"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={incrementQuantity}
                  className="bg-gray-200 px-3 py-2 rounded-r-md"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              className="bg-shop-purple hover:bg-shop-dark-purple text-white"
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="border-shop-purple text-shop-purple hover:bg-shop-purple hover:text-white"
              size="lg"
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
            >
              Buy Now
            </Button>
          </div>
          
          <div className="mt-8 border-t pt-6">
            <h2 className="text-lg font-semibold mb-2">Product Details</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex">
                <span className="font-medium w-28">Category:</span>
                <span className="text-gray-700 capitalize">{product.category}</span>
              </li>
              <li className="flex">
                <span className="font-medium w-28">SKU:</span>
                <span className="text-gray-700">SKU-{product.id.padStart(6, '0')}</span>
              </li>
              <li className="flex">
                <span className="font-medium w-28">Weight:</span>
                <span className="text-gray-700">0.5 kg</span>
              </li>
              <li className="flex">
                <span className="font-medium w-28">Dimensions:</span>
                <span className="text-gray-700">10 × 10 × 10 cm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Tabs Section for Additional Info */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button className="border-b-2 border-shop-purple px-1 py-4 text-sm font-medium text-shop-purple">
              Description
            </button>
            <button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:text-shop-purple">
              Reviews (132)
            </button>
            <button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-gray-500 hover:text-shop-purple">
              FAQs
            </button>
          </nav>
        </div>
        <div className="py-8">
          <div className="prose max-w-none">
            <p>{product.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </p>
            <p>
              Features:
            </p>
            <ul>
              <li>High-quality materials for durability</li>
              <li>Premium design and finish</li>
              <li>Easy to use and maintain</li>
              <li>Versatile for various settings</li>
              <li>Energy efficient and eco-friendly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

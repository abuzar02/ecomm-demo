
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCart } from '@/context/CartContext';
import { X } from 'lucide-react';

const CartPage: React.FC = () => {
  const { state, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
    }
  };
  
  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {state.items.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <svg 
            className="mx-auto w-16 h-16 text-gray-400 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
            />
          </svg>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button 
            className="bg-shop-purple hover:bg-shop-dark-purple text-white"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="hidden sm:grid grid-cols-6 gap-4 p-4 bg-gray-50 text-sm font-medium text-gray-600">
                <div className="col-span-3">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
              </div>
              
              {state.items.map((item) => (
                <div 
                  key={item.id} 
                  className="grid grid-cols-1 sm:grid-cols-6 gap-4 p-4 border-b border-gray-100 items-center"
                >
                  {/* Product Info */}
                  <div className="col-span-1 sm:col-span-3">
                    <div className="flex items-center">
                      <div className="w-20 h-20 rounded overflow-hidden mr-4 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium mb-1">
                          <Link to={`/product/${item.id}`} className="hover:text-shop-purple">
                            {item.name}
                          </Link>
                        </h3>
                        <button 
                          className="text-sm text-red-500 flex items-center sm:hidden"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <X size={16} className="mr-1" />
                          Remove
                        </button>
                      </div>
                      <button 
                        className="text-gray-400 hover:text-red-500 hidden sm:block"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="text-center">
                    <div className="sm:hidden text-sm text-gray-600">Price:</div>
                    <div>${item.price.toFixed(2)}</div>
                  </div>
                  
                  {/* Quantity */}
                  <div className="text-center">
                    <div className="sm:hidden text-sm text-gray-600 mb-1">Quantity:</div>
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="bg-gray-200 px-2 py-1 rounded-l text-gray-600"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        className="w-12 text-center border-t border-b border-gray-200 py-1"
                        min="1"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="bg-gray-200 px-2 py-1 rounded-r text-gray-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Total */}
                  <div className="text-right">
                    <div className="sm:hidden text-sm text-gray-600">Total:</div>
                    <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
              
              {/* Cart Actions */}
              <div className="p-4 flex justify-between items-center bg-gray-50">
                <Link 
                  to="/products" 
                  className="text-shop-purple hover:underline flex items-center"
                >
                  <svg 
                    className="w-4 h-4 mr-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                    />
                  </svg>
                  Continue Shopping
                </Link>
                
                <Button 
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-50"
                  onClick={() => {
                    state.items.forEach(item => removeFromCart(item.id));
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${state.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{state.totalPrice >= 50 ? 'Free' : '$4.99'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(state.totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${(state.totalPrice + (state.totalPrice >= 50 ? 0 : 4.99) + (state.totalPrice * 0.08)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-shop-purple hover:bg-shop-dark-purple text-white"
                size="lg"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  We accept:
                </p>
                <div className="flex justify-center space-x-2 mt-2">
                  <span className="bg-gray-100 rounded px-2 py-1 text-xs">Visa</span>
                  <span className="bg-gray-100 rounded px-2 py-1 text-xs">Mastercard</span>
                  <span className="bg-gray-100 rounded px-2 py-1 text-xs">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

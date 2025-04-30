
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface LocationState {
  orderId: string;
  totalAmount: number;
  shippingInfo: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
}

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  
  useEffect(() => {
    // If there's no order state (e.g., user navigated directly to this page), redirect to home
    if (!state || !state.orderId) {
      navigate('/');
    }
  }, [state, navigate]);
  
  if (!state || !state.orderId) {
    return null;
  }
  
  const { orderId, totalAmount, shippingInfo } = state;
  
  // Estimated delivery date - 3-7 business days from now
  const today = new Date();
  const estimatedMin = new Date(today);
  estimatedMin.setDate(today.getDate() + 3);
  const estimatedMax = new Date(today);
  estimatedMax.setDate(today.getDate() + 7);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Your order has been placed and is being processed.
          </p>
        </div>
        
        <div className="border-t border-b py-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="font-semibold">{orderId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Date</p>
              <p className="font-semibold">{formatDate(today)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
              <p className="font-semibold">{formatDate(estimatedMin)} - {formatDate(estimatedMax)}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">Shipping Address</p>
            <p className="font-semibold">{shippingInfo.firstName} {shippingInfo.lastName}</p>
            <p>{shippingInfo.address}</p>
            <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
            <p>{shippingInfo.country === 'US' ? 'United States' : shippingInfo.country}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-1">Payment Information</p>
            <p>Total Amount: <span className="font-semibold">${totalAmount.toFixed(2)}</span></p>
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            We'll send you shipping confirmation once your order is on the way!
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 justify-center">
            <Button 
              className="bg-shop-purple hover:bg-shop-dark-purple text-white"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
            <Button 
              variant="outline"
              className="border-shop-purple text-shop-purple hover:bg-shop-purple hover:text-white"
            >
              Track Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

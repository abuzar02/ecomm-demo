
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from '@/components/ProductCard';
import { products, categories, Product } from '@/data/products';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  // Initialize filters from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategoryFilter(categoryParam.split(','));
    }
    
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice && maxPrice) {
      setPriceRange([parseInt(minPrice), parseInt(maxPrice)]);
    }
    
    const rating = searchParams.get('rating');
    if (rating) {
      setRatingFilter(parseInt(rating));
    }
    
    const sort = searchParams.get('sort');
    if (sort) {
      setSortOption(sort);
    }
    
    const page = searchParams.get('page');
    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, []);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (categoryFilter.length > 0) {
      result = result.filter(product => categoryFilter.includes(product.category));
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply rating filter
    if (ratingFilter) {
      result = result.filter(product => product.rating >= ratingFilter);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // For simplicity, assume id represents newness
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
    }
    
    setFilteredProducts(result);
    
    // Update URL parameters
    const params: Record<string, string> = {};
    
    if (categoryFilter.length > 0) {
      params.category = categoryFilter.join(',');
    }
    
    params.minPrice = priceRange[0].toString();
    params.maxPrice = priceRange[1].toString();
    
    if (ratingFilter) {
      params.rating = ratingFilter.toString();
    }
    
    params.sort = sortOption;
    params.page = currentPage.toString();
    
    setSearchParams(params);
  }, [categoryFilter, priceRange, ratingFilter, sortOption, currentPage]);
  
  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const handleCategoryChange = (category: string) => {
    setCategoryFilter(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
    setCurrentPage(1); // Reset to first page on filter change
  };
  
  const handleRatingChange = (rating: number) => {
    setRatingFilter(prev => prev === rating ? null : rating);
    setCurrentPage(1);
  };
  
  const handleSortChange = (value: string) => {
    setSortOption(value);
  };
  
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  const handlePriceInputChange = (index: number, value: string) => {
    const newValue = parseInt(value) || 0;
    if (index === 0) {
      setPriceRange([newValue, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], newValue]);
    }
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <div key={category.id} className="flex items-center">
                  <Checkbox 
                    id={`category-${category.id}`}
                    checked={categoryFilter.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <label 
                    htmlFor={`category-${category.id}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Price Range</h2>
            <div className="mb-6">
              <Slider
                value={[priceRange[0], priceRange[1]]}
                min={0}
                max={1500}
                step={10}
                onValueChange={handlePriceRangeChange}
                className="my-6"
              />
              <div className="flex items-center justify-between gap-4">
                <div className="w-full">
                  <label htmlFor="min-price" className="text-sm text-gray-600 mb-1 block">Min</label>
                  <Input
                    id="min-price"
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceInputChange(0, e.target.value)}
                    min={0}
                    max={priceRange[1]}
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="max-price" className="text-sm text-gray-600 mb-1 block">Max</label>
                  <Input
                    id="max-price"
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceInputChange(1, e.target.value)}
                    min={priceRange[0]}
                    max={1500}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Rating</h2>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center">
                  <Checkbox 
                    id={`rating-${rating}`}
                    checked={ratingFilter === rating}
                    onCheckedChange={() => handleRatingChange(rating)}
                  />
                  <label 
                    htmlFor={`rating-${rating}`}
                    className="ml-2 flex items-center"
                  >
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-gray-600">& Up</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            variant="outline"
            className="w-full border-shop-purple text-shop-purple hover:bg-shop-purple hover:text-white"
            onClick={() => {
              setCategoryFilter([]);
              setPriceRange([0, 1500]);
              setRatingFilter(null);
              setSortOption('newest');
              setCurrentPage(1);
            }}
          >
            Clear All Filters
          </Button>
        </div>
        
        {/* Product Grid */}
        <div className="lg:w-3/4">
          {currentProducts.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to find products.</p>
              <Button 
                variant="outline"
                className="border-shop-purple text-shop-purple hover:bg-shop-purple hover:text-white"
                onClick={() => {
                  setCategoryFilter([]);
                  setPriceRange([0, 1500]);
                  setRatingFilter(null);
                }}
              >
                Reset Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      &lt;
                    </Button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                      <Button
                        key={index}
                        variant={currentPage === index + 1 ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? "bg-shop-purple hover:bg-shop-dark-purple" : ""}
                      >
                        {index + 1}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      &gt;
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

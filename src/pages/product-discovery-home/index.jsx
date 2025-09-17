import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ProductGrid from './components/ProductGrid';
import LoadingState from './components/LoadingState';

const ProductDiscoveryHome = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    maxPrice: '',
    minRating: ''
  });
  const [isMobileFilterExpanded, setIsMobileFilterExpanded] = useState(false);

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "The Psychology of Money: Timeless lessons on wealth, greed, and happiness",
      category: "Books",
      price: 14.99,
      rating: 4.7,
      description: "Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people.",
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/0857197681"
    },
    {
      id: 2,
      name: "Apple iPhone 15 Pro Max 256GB - Natural Titanium",
      category: "Electronics",
      price: 1199.99,
      rating: 4.8,
      description: "The most advanced iPhone ever with titanium design, A17 Pro chip, and professional camera system for stunning photos and videos.",
      imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/B0CHX1W1XY"
    },
    {
      id: 3,
      name: "Levi\'s Women\'s 501 Original Fit Jeans",
      category: "Fashion",
      price: 89.50,
      rating: 4.4,
      description: "The original blue jean since 1873. With a classic straight leg and iconic styling, these jeans are a timeless wardrobe staple.",
      imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/B077Z8SRYS"
    },
    {
      id: 4,
      name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      category: "Electronics",
      price: 399.99,
      rating: 4.6,
      description: "Industry-leading noise canceling with Dual Noise Sensor technology. Up to 30-hour battery life with quick charge.",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/B09XS7JWHH"
    },
    {
      id: 5,
      name: "Kate Spade New York Women\'s Margaux Medium Satchel",
      category: "Accessories",
      price: 298.00,
      rating: 4.5,
      description: "Refined saffiano leather satchel with structured silhouette and signature spade hardware. Perfect for work or weekend.",
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/B07QXJW8YZ"
    },
    {
      id: 6,
      name: "Atomic Habits: An Easy & Proven Way to Build Good Habits",
      category: "Books",
      price: 13.49,
      rating: 4.8,
      description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies.",
      imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/0735211299"
    },
    {
      id: 7,
      name: "Nike Air Force 1 \'07 Sneakers",
      category: "Fashion",
      price: 110.00,
      rating: 4.7,
      description: "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best.",
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/B077XBQZPX"
    },
    {
      id: 8,
      name: "Apple Watch Series 9 GPS 45mm Midnight Aluminum",
      category: "Electronics",
      price: 429.00,
      rating: 4.6,
      description: "Your essential companion for a healthy life is now even more powerful. Advanced health features and connectivity.",
      imageUrl: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/B0CHX8SZQS"
    },
    {
      id: 9,
      name: "Ray-Ban Aviator Classic Sunglasses",
      category: "Accessories",
      price: 154.00,
      rating: 4.4,
      description: "The most iconic sunglass model in the world. Crystal lenses provide 100% UV protection while maintaining perfect clarity.",
      imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/B001GNBJQ4"
    },
    {
      id: 10,
      name: "The 7 Habits of Highly Effective People",
      category: "Books",
      price: 16.99,
      rating: 4.6,
      description: "Stephen Covey's timeless wisdom that has empowered countless people to live more fulfilling lives based on principles.",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/1982137274"
    },
    {
      id: 11,
      name: "Patagonia Better Sweater Fleece Jacket",
      category: "Fashion",
      price: 139.00,
      rating: 4.5,
      description: "Classic fleece jacket made from recycled polyester. Warm, comfortable, and environmentally conscious choice.",
      imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/B07QXBW9YH"
    },
    {
      id: 12,
      name: "Anker PowerCore 10000 Portable Charger",
      category: "Electronics",
      price: 24.99,
      rating: 4.7,
      description: "Ultra-compact portable charger with high-speed charging technology. Perfect for travel and daily use.",
      imageUrl: "https://images.unsplash.com/photo-1609592806596-4d3b0c3b7e0b?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/B019GJLER8"
    },
    {
      id: 13,
      name: "Fossil Gen 6 Smartwatch Leather Strap",
      category: "Accessories",
      price: 189.99,
      rating: 4.3,
      description: "Premium leather smartwatch strap with heart rate tracking, GPS, and customizable watch faces powered by Wear OS.",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/B09BVZQ8XH"
    },
    {
      id: 14,
      name: "Think and Grow Rich by Napoleon Hill",
      category: "Books",
      price: 12.99,
      rating: 4.5,
      description: "The landmark bestseller that has motivated millions of readers to transform their lives and realize their dreams.",
      imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/1585424331"
    },
    {
      id: 15,
      name: "Adidas Ultraboost 22 Running Shoes",
      category: "Fashion",
      price: 190.00,
      rating: 4.6,
      description: "Revolutionary running shoe with responsive BOOST midsole and Primeknit upper for ultimate comfort and performance.",
      imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
      amazonLink: "https://amazon.com/dp/B09TQXW8YZ"
    }
  ];

  // Initialize products on component mount
  useEffect(() => {
    const initializeProducts = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    };

    initializeProducts();
  }, []);

  // Filter products based on search query and filters
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    if (filters?.category) {
      filtered = filtered?.filter(product => product?.category === filters?.category);
    }

    // Apply price filter
    if (filters?.maxPrice) {
      const maxPrice = parseFloat(filters?.maxPrice);
      filtered = filtered?.filter(product => product?.price <= maxPrice);
    }

    // Apply rating filter
    if (filters?.minRating) {
      const minRating = parseFloat(filters?.minRating);
      filtered = filtered?.filter(product => product?.rating >= minRating);
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, filters]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = () => {
    // Search is handled by useEffect, but we can add analytics here
    console.log('Search submitted:', searchQuery);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      maxPrice: '',
      minRating: ''
    });
    setSearchQuery('');
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterExpanded(!isMobileFilterExpanded);
  };

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading Products - Mini Amazon Explorer</title>
          <meta name="description" content="Loading amazing products for you to discover..." />
        </Helmet>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <LoadingState />
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Product Discovery - Mini Amazon Explorer</title>
        <meta name="description" content="Discover amazing products across Books, Electronics, Fashion, and Accessories. Find the best deals and shop directly on Amazon." />
        <meta name="keywords" content="products, shopping, amazon, books, electronics, fashion, accessories, deals" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Discover Amazing Products
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore curated products across Books, Electronics, Fashion, and Accessories. 
                Find what you love and shop directly on Amazon.
              </p>
            </div>

            {/* Search Bar */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
            />

            {/* Filter Panel */}
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              isMobile={window.innerWidth < 768}
              isExpanded={isMobileFilterExpanded}
              onToggleExpanded={toggleMobileFilter}
            />

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                {searchQuery || filters?.category || filters?.maxPrice || filters?.minRating ? (
                  <>
                    Showing {filteredProducts?.length} result{filteredProducts?.length !== 1 ? 's' : ''}
                    {searchQuery && ` for "${searchQuery}"`}
                    {filters?.category && ` in ${filters?.category}`}
                    {filters?.maxPrice && ` under $${filters?.maxPrice}`}
                    {filters?.minRating && ` with ${filters?.minRating}+ stars`}
                  </>
                ) : (
                  `Showing all ${filteredProducts?.length} products`
                )}
              </p>
            </div>

            {/* Product Grid */}
            <ProductGrid
              products={filteredProducts}
              isLoading={false}
              searchQuery={searchQuery}
              filters={filters}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductDiscoveryHome;
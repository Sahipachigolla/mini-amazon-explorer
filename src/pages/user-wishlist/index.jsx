import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import WishlistHeader from './components/WishlistHeader';
import WishlistControls from './components/WishlistControls';
import WishlistGrid from './components/WishlistGrid';
import EmptyWishlist from './components/EmptyWishlist';

const UserWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [sortBy, setSortBy] = useState('dateAdded');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  const navigate = useNavigate();

  // Mock wishlist data
  const mockWishlistData = [
    {
      id: "1",
      name: "Apple iPhone 15 Pro Max 256GB - Natural Titanium",
      category: "Electronics",
      price: 1199.99,
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      amazonLink: "https://amazon.com/dp/B0CHX1W1XY",
      dateAdded: new Date('2024-09-15'),
      priceChange: -50.00,
      description: "The most advanced iPhone ever with titanium design and powerful A17 Pro chip."
    },
    {
      id: "2", 
      name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      category: "Electronics",
      price: 349.99,
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      amazonLink: "https://amazon.com/dp/B09XS7JWHH",
      dateAdded: new Date('2024-09-10'),
      priceChange: null,
      description: "Industry-leading noise canceling with exceptional sound quality."
    },
    {
      id: "3",
      name: "The Psychology of Money by Morgan Housel",
      category: "Books",
      price: 14.99,
      rating: 4.9,
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
      amazonLink: "https://amazon.com/dp/0857197681",
      dateAdded: new Date('2024-09-08'),
      priceChange: +2.00,
      description: "Timeless lessons on wealth, greed, and happiness from one of the most important authors of our time."
    },
    {
      id: "4",
      name: "Levi\'s 501 Original Fit Jeans - Dark Wash",
      category: "Fashion",
      price: 89.99,
      rating: 4.5,
      imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      amazonLink: "https://amazon.com/dp/B000NQZS8Q",
      dateAdded: new Date('2024-09-05'),
      priceChange: -10.00,
      description: "The original blue jean since 1873. Crafted with premium denim for lasting comfort."
    },
    {
      id: "5",
      name: "Apple Watch Series 9 GPS 45mm - Midnight Aluminum",
      category: "Accessories",
      price: 429.99,
      rating: 4.6,
      imageUrl: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop",
      amazonLink: "https://amazon.com/dp/B0CHX8SZQS",
      dateAdded: new Date('2024-09-03'),
      priceChange: null,
      description: "The most advanced Apple Watch yet with powerful health and fitness features."
    },
    {
      id: "6",
      name: "Nike Air Force 1 \'07 - White/White",
      category: "Fashion",
      price: 110.00,
      rating: 4.4,
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      amazonLink: "https://amazon.com/dp/B000BNQZS8",
      dateAdded: new Date('2024-08-30'),
      priceChange: +5.00,
      description: "The iconic basketball shoe that\'s been a street style staple for decades."
    }
  ];

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/user-login');
      return;
    }

    // Simulate loading wishlist data
    const loadWishlistData = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load wishlist from localStorage or use mock data
      const savedWishlist = localStorage.getItem('userWishlist');
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlistItems(parsedWishlist);
        setLastUpdated(new Date());
      } else {
        // Use mock data for demonstration
        setWishlistItems(mockWishlistData);
        setLastUpdated(new Date());
        localStorage.setItem('userWishlist', JSON.stringify(mockWishlistData));
      }
      
      setIsLoading(false);
    };

    loadWishlistData();
  }, [navigate]);

  const sortProducts = (products, sortType) => {
    const sorted = [...products];
    
    switch (sortType) {
      case 'dateAdded':
        return sorted?.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      case 'priceAsc':
        return sorted?.sort((a, b) => a?.price - b?.price);
      case 'priceDesc':
        return sorted?.sort((a, b) => b?.price - a?.price);
      case 'rating':
        return sorted?.sort((a, b) => b?.rating - a?.rating);
      case 'name':
        return sorted?.sort((a, b) => a?.name?.localeCompare(b?.name));
      default:
        return sorted;
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const handleRemoveItem = async (productId) => {
    const updatedItems = wishlistItems?.filter(item => item?.id !== productId);
    setWishlistItems(updatedItems);
    setSelectedItems(selectedItems?.filter(id => id !== productId));
    setLastUpdated(new Date());
    
    // Update localStorage
    localStorage.setItem('userWishlist', JSON.stringify(updatedItems));
  };

  const handleBulkRemove = async () => {
    const updatedItems = wishlistItems?.filter(item => !selectedItems?.includes(item?.id));
    setWishlistItems(updatedItems);
    setSelectedItems([]);
    setLastUpdated(new Date());
    
    // Update localStorage
    localStorage.setItem('userWishlist', JSON.stringify(updatedItems));
  };

  const handleSelectAll = () => {
    setSelectedItems(wishlistItems?.map(item => item?.id));
  };

  const handleClearSelection = () => {
    setSelectedItems([]);
  };

  const handleSelectionChange = (productId, isSelected) => {
    if (isSelected) {
      setSelectedItems([...selectedItems, productId]);
    } else {
      setSelectedItems(selectedItems?.filter(id => id !== productId));
    }
  };

  const handleAmazonRedirect = (amazonLink) => {
    window.open(amazonLink, '_blank', 'noopener,noreferrer');
  };

  const sortedProducts = sortProducts(wishlistItems, sortBy);
  const showSelection = selectedItems?.length > 0 || wishlistItems?.length > 1;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground">Loading your wishlist...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <WishlistHeader 
            totalItems={wishlistItems?.length}
            lastUpdated={lastUpdated}
          />

          {wishlistItems?.length > 0 ? (
            <>
              <WishlistControls
                sortBy={sortBy}
                onSortChange={handleSortChange}
                selectedItems={selectedItems}
                onBulkRemove={handleBulkRemove}
                onSelectAll={handleSelectAll}
                onClearSelection={handleClearSelection}
                totalItems={wishlistItems?.length}
              />

              <WishlistGrid
                products={sortedProducts}
                onRemoveItem={handleRemoveItem}
                onAmazonRedirect={handleAmazonRedirect}
                selectedItems={selectedItems}
                onSelectionChange={handleSelectionChange}
                showSelection={showSelection}
              />
            </>
          ) : (
            <EmptyWishlist />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserWishlist;
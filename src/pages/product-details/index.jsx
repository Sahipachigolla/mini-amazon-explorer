import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import RelatedProducts from './components/RelatedProducts';
import ProductBreadcrumb from './components/ProductBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProductDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const productId = searchParams?.get('id');

  // Mock product data
  const mockProducts = [
    {
      id: "1",
      name: "The Psychology of Money: Timeless lessons on wealth, greed, and happiness",
      category: "Books",
      price: 14.99,
      originalPrice: 18.99,
      rating: 4.7,
      reviewCount: 12847,
      description: `Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people.\n\nMoney—investing, personal finance, and business decisions—is typically taught as a math-based field, where data and formulas tell us exactly what to do. But in the real world people don't make financial decisions on a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history, your own unique view of the world, ego, pride, marketing, and odd incentives are scrambled together.\n\nIn The Psychology of Money, award-winning author Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life's most important topics.`,
      imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
      ],
      features: [
        "19 compelling short stories about money psychology",
        "Award-winning author Morgan Housel",
        "Practical insights for better financial decisions",
        "Easy-to-understand behavioral finance concepts"
      ],
      amazonLink: "https://amazon.com/psychology-money-timeless-lessons-happiness/dp/0857197681"
    },
    {
      id: "2",
      name: "Apple iPhone 15 Pro Max 256GB - Natural Titanium",
      category: "Electronics",
      price: 1199.99,
      originalPrice: 1299.99,
      rating: 4.8,
      reviewCount: 8934,
      description: `The iPhone 15 Pro Max is the ultimate iPhone experience with the most advanced Pro camera system ever, A17 Pro chip, customizable Action Button, and robust titanium design.\n\nFeaturing a 6.7-inch Super Retina XDR display with ProMotion technology, the iPhone 15 Pro Max delivers stunning visuals with incredible detail and color accuracy. The titanium design makes it the lightest Pro model ever while maintaining exceptional durability.\n\nThe revolutionary A17 Pro chip provides desktop-class performance for demanding apps and games, while the advanced camera system captures professional-quality photos and videos in any lighting condition.`,
      imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&h=500&fit=crop"
      ],
      features: [
        "6.7-inch Super Retina XDR display with ProMotion",
        "A17 Pro chip with 6-core GPU",
        "Pro camera system with 48MP Main camera",
        "Titanium design - lightest Pro model ever",
        "Action Button for quick shortcuts",
        "USB-C connector with USB 3 support"
      ],
      amazonLink: "https://amazon.com/apple-iphone-15-pro-max/dp/B0CHX1W1XY"
    },
    {
      id: "3",
      name: "Levi\'s Women\'s 501 Original Fit Jeans - Medium Wash",
      category: "Fashion",
      price: 89.99,
      originalPrice: 109.99,
      rating: 4.5,
      reviewCount: 5672,
      description: `The original blue jean since 1873. The Levi's 501 Original Fit Jeans are a timeless classic that never goes out of style. Crafted from premium denim with the perfect amount of stretch for comfort and durability.\n\nFeaturing the iconic straight leg fit that's been loved for generations, these jeans sit at the waist and are cut to be worn cuffed or uncuffed. The medium wash provides versatility for both casual and dressed-up looks.\n\nMade with sustainable cotton and designed to last, these jeans will only get better with age and wear.`,
      imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop"
      ],
      features: [
        "Original 501 fit - straight leg, sits at waist",
        "Premium denim with comfort stretch",
        "Medium wash for versatile styling",
        "Sustainable cotton construction",
        "Button fly closure",
        "Classic 5-pocket design"
      ],
      amazonLink: "https://amazon.com/levis-womens-original-jeans/dp/B07QFXK8ZM"
    },
    {
      id: "4",
      name: "Apple Watch Series 9 GPS 45mm - Midnight Aluminum Case",
      category: "Accessories",
      price: 429.99,
      originalPrice: 459.99,
      rating: 4.6,
      reviewCount: 3421,
      description: `The most advanced Apple Watch yet, featuring the breakthrough S9 chip that enables a magical new way to use your watch without touching the screen.\n\nWith Double Tap, you can answer calls, stop timers, play music, and more, all with a simple gesture. The Always-On Retina display is 2x brighter than Series 8, making it easier to read in bright sunlight.\n\nAdvanced health features help you understand your body better, while comprehensive fitness tracking keeps you motivated to reach your goals.`,
      imageUrl: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
      ],
      features: [
        "S9 chip with Double Tap gesture control",
        "Always-On Retina display - 2x brighter",
        "Advanced health monitoring",
        "Comprehensive fitness tracking",
        "Water resistant to 50 meters",
        "All-day battery life"
      ],
      amazonLink: "https://amazon.com/apple-watch-series-9-gps/dp/B0CHX8SZQS"
    },
    {
      id: "5",
      name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
      category: "Electronics",
      price: 349.99,
      originalPrice: 399.99,
      rating: 4.9,
      reviewCount: 7823,
      description: `Industry-leading noise canceling with the new Integrated Processor V1 and dual noise sensor technology. Exceptional sound quality with the new 30mm driver unit.\n\nUp to 30-hour battery life with quick charge (3 min charge for 3 hours of playback). Crystal clear hands-free calling with precise voice pickup technology.\n\nIntuitive touch control settings to pause play skip tracks, control volume, activate your voice assistant, and answer phone calls.`,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop"
      ],
      features: [
        "Industry-leading noise canceling technology",
        "30-hour battery life with quick charge",
        "Premium sound quality with 30mm drivers",
        "Crystal clear hands-free calling",
        "Intuitive touch controls",
        "Comfortable lightweight design"
      ],
      amazonLink: "https://amazon.com/sony-wh-1000xm5-wireless-headphones/dp/B09XS7JWHH"
    }
  ];

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    setIsAuthenticated(token && userData);

    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }

    // Simulate API call to fetch product
    const fetchProduct = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const foundProduct = mockProducts?.find(p => p?.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        }
        setIsLoading(false);
      }, 500);
    };

    if (productId) {
      fetchProduct();
    } else {
      setIsLoading(false);
    }
  }, [productId]);

  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      navigate('/user-login');
      return;
    }

    const isInWishlist = wishlist?.some(item => item?.id === product?.id);
    let updatedWishlist;

    if (isInWishlist) {
      updatedWishlist = wishlist?.filter(item => item?.id !== product?.id);
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const isInWishlist = wishlist?.some(item => item?.id === product?.id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground">Loading product details...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
              <div className="text-center space-y-4">
                <Icon name="Package" size={64} className="text-muted-foreground mx-auto" />
                <h1 className="text-2xl font-bold text-foreground">Product Not Found</h1>
                <p className="text-muted-foreground max-w-md">
                  The product you're looking for doesn't exist or may have been removed.
                </p>
              </div>
              <Button
                variant="default"
                onClick={() => navigate('/product-discovery-home')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <ProductBreadcrumb product={product} />

          {/* Product Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Product Images */}
            <div className="order-1 lg:order-1">
              <ProductImageGallery 
                images={product?.images || [product?.imageUrl]} 
                productName={product?.name}
              />
            </div>

            {/* Product Information */}
            <div className="order-2 lg:order-2">
              <ProductInfo 
                product={product}
                onAddToWishlist={handleAddToWishlist}
                isInWishlist={isInWishlist}
              />
            </div>
          </div>

          {/* Related Products Section */}
          <RelatedProducts 
            products={mockProducts}
            currentProductId={product?.id}
          />
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
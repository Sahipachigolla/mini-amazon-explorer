import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsWishlisted(!isWishlisted);
    
    // Mock wishlist functionality
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (isWishlisted) {
      const updatedWishlist = wishlist?.filter(item => item?.id !== product?.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } else {
      wishlist?.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  };

  const handleAmazonRedirect = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    window.open(product?.amazonLink, '_blank', 'noopener,noreferrer');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={14} className="text-yellow-400 fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 group">
      <Link to={`/product-details?id=${product?.id}`} className="block">
        <div className="relative overflow-hidden h-48 bg-gray-50">
          <Image
            src={product?.imageUrl}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200"
          >
            <Icon 
              name="Heart" 
              size={16} 
              className={isWishlisted ? "text-red-500 fill-current" : "text-gray-600"} 
            />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-2">
            <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              {product?.category}
            </span>
          </div>
          
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {product?.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-2">
              {renderStars(product?.rating)}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product?.rating})
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary">
              ${product?.price?.toFixed(2)}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {product?.description}
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4 space-y-2">
        <Link to={`/product-details?id=${product?.id}`}>
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        
        <Button 
          variant="default" 
          className="w-full"
          onClick={handleAmazonRedirect}
          iconName="ExternalLink"
          iconPosition="right"
        >
          Buy on Amazon
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
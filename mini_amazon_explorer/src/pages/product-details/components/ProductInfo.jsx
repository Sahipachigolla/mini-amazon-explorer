import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product, onAddToWishlist, isInWishlist }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={16} className="text-yellow-400 fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  const handleBuyOnAmazon = () => {
    window.open(product?.amazonLink, '_blank', 'noopener,noreferrer');
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const getCategoryIcon = (category) => {
    const categoryIcons = {
      'Books': 'Book',
      'Electronics': 'Smartphone',
      'Fashion': 'Shirt',
      'Accessories': 'Watch'
    };
    return categoryIcons?.[category] || 'Package';
  };

  return (
    <div className="space-y-6">
      {/* Category Badge */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1 bg-muted px-3 py-1 rounded-full">
          <Icon name={getCategoryIcon(product?.category)} size={14} className="text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">{product?.category}</span>
        </div>
      </div>
      {/* Product Title */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
          {product?.name}
        </h1>
      </div>
      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(product?.rating)}
        </div>
        <span className="text-lg font-semibold text-foreground">{product?.rating}</span>
        <span className="text-muted-foreground">({product?.reviewCount || 0} reviews)</span>
      </div>
      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-primary">
            {formatPrice(product?.price)}
          </span>
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product?.originalPrice)}
            </span>
          )}
        </div>
        {product?.originalPrice && product?.originalPrice > product?.price && (
          <div className="flex items-center space-x-2">
            <span className="bg-success text-success-foreground px-2 py-1 rounded text-sm font-medium">
              Save {formatPrice(product?.originalPrice - product?.price)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}% off)
            </span>
          </div>
        )}
      </div>
      {/* Product Description */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground">Description</h3>
        <div className="text-muted-foreground leading-relaxed">
          <p className={`${!isDescriptionExpanded ? 'line-clamp-4' : ''}`}>
            {product?.description}
          </p>
          {product?.description && product?.description?.length > 200 && (
            <button
              onClick={toggleDescription}
              className="mt-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200"
            >
              {isDescriptionExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>
      {/* Key Features */}
      {product?.features && product?.features?.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Key Features</h3>
          <ul className="space-y-2">
            {product?.features?.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleBuyOnAmazon}
          iconName="ExternalLink"
          iconPosition="right"
          className="text-lg font-semibold"
        >
          Buy on Amazon
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={onAddToWishlist}
          iconName={isInWishlist ? "Heart" : "Heart"}
          iconPosition="left"
          className={isInWishlist ? 'text-red-500 border-red-500' : ''}
        >
          {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </Button>
      </div>
      {/* Trust Signals */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={16} className="text-success" />
            <span>Secure Purchase</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Truck" size={16} className="text-primary" />
            <span>Fast Shipping</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="RotateCcw" size={16} className="text-accent" />
            <span>Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
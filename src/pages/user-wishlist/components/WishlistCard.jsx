import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const WishlistCard = ({ 
  product, 
  onRemove, 
  onAmazonRedirect,
  isSelected,
  onSelectionChange,
  showSelection = false
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove(product?.id);
    setIsRemoving(false);
  };

  const handleAmazonClick = () => {
    onAmazonRedirect(product?.amazonLink);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
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

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }

    return stars;
  };

  const formatDateAdded = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-all duration-200 group">
      {/* Selection Checkbox */}
      {showSelection && (
        <div className="p-3 border-b border-border">
          <Checkbox
            checked={isSelected}
            onChange={(e) => onSelectionChange(product?.id, e?.target?.checked)}
            label=""
          />
        </div>
      )}
      {/* Product Image */}
      <div className="relative overflow-hidden h-48 bg-muted">
        <Image
          src={product?.imageUrl}
          alt={product?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Price Change Indicator */}
        {product?.priceChange && (
          <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
            product?.priceChange > 0 
              ? 'bg-red-100 text-red-700' :'bg-green-100 text-green-700'
          }`}>
            {product?.priceChange > 0 ? '+' : ''}{formatPrice(product?.priceChange)}
          </div>
        )}

        {/* Quick Remove Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 left-2 bg-white/90 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={handleRemove}
          loading={isRemoving}
          disabled={isRemoving}
        >
          <Icon name="Trash2" size={16} className="text-red-600" />
        </Button>
      </div>
      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <Link
            to={`/product-details?id=${product?.id}`}
            className="text-foreground hover:text-primary transition-colors duration-200"
          >
            <h3 className="font-semibold text-sm line-clamp-2 mb-1">
              {product?.name}
            </h3>
          </Link>
          
          <p className="text-xs text-muted-foreground mb-2">
            {product?.category}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center space-x-0.5">
            {renderStars(product?.rating)}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({product?.rating})
          </span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product?.price)}
          </span>
        </div>

        {/* Date Added */}
        <div className="flex items-center space-x-1 mb-3 text-xs text-muted-foreground">
          <Icon name="Calendar" size={12} />
          <span>Added {formatDateAdded(product?.dateAdded)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link to={`/product-details?id=${product?.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              <Icon name="Eye" size={14} className="mr-1" />
              View Details
            </Button>
          </Link>
          
          <Button
            variant="default"
            size="sm"
            onClick={handleAmazonClick}
            className="flex-1"
          >
            <Icon name="ExternalLink" size={14} className="mr-1" />
            Buy Now
          </Button>
        </div>

        {/* Remove from Wishlist */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          loading={isRemoving}
          disabled={isRemoving}
          className="w-full mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Icon name="Heart" size={14} className="mr-1 fill-current" />
          Remove from Wishlist
        </Button>
      </div>
    </div>
  );
};

export default WishlistCard;
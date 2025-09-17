import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RelatedProducts = ({ products, currentProductId }) => {
  const relatedProducts = products?.filter(product => product?.id !== currentProductId)?.slice(0, 4);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={12} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={12} className="text-yellow-400 fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-gray-300" />
      );
    }

    return stars;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  if (relatedProducts?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Related Products</h2>
        <Link to="/product-discovery-home">
          <Button variant="ghost" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts?.map((product) => (
          <div
            key={product?.id}
            className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 group"
          >
            {/* Product Image */}
            <div className="aspect-square overflow-hidden bg-white">
              <Image
                src={product?.imageUrl}
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
              {/* Category */}
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {product?.category}
              </div>

              {/* Product Name */}
              <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
                {product?.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(product?.rating)}
                </div>
                <span className="text-sm font-medium text-foreground">{product?.rating}</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-2">
                <span className="text-lg font-bold text-primary">
                  {formatPrice(product?.price)}
                </span>
                {product?.originalPrice && product?.originalPrice > product?.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product?.originalPrice)}
                  </span>
                )}
              </div>

              {/* Action Button */}
              <Link to={`/product-details?id=${product?.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Eye"
                  iconPosition="left"
                  className="mt-3"
                >
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
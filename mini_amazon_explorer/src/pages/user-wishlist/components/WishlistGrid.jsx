import React from 'react';
import WishlistCard from './WishlistCard';

const WishlistGrid = ({ 
  products, 
  onRemoveItem, 
  onAmazonRedirect,
  selectedItems,
  onSelectionChange,
  showSelection = false
}) => {
  if (products?.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products?.map((product) => (
        <WishlistCard
          key={product?.id}
          product={product}
          onRemove={onRemoveItem}
          onAmazonRedirect={onAmazonRedirect}
          isSelected={selectedItems?.includes(product?.id)}
          onSelectionChange={onSelectionChange}
          showSelection={showSelection}
        />
      ))}
    </div>
  );
};

export default WishlistGrid;
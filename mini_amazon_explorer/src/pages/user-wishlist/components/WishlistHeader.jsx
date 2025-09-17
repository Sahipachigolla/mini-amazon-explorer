import React from 'react';
import Icon from '../../../components/AppIcon';

const WishlistHeader = ({ totalItems, lastUpdated }) => {
  const formatLastUpdated = (date) => {
    if (!date) return 'Never';
    
    const now = new Date();
    const updatedDate = new Date(date);
    const diffInHours = Math.floor((now - updatedDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    
    return updatedDate?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Heart" size={24} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Wishlist</h1>
            <p className="text-muted-foreground">
              {totalItems === 0 
                ? 'No items saved yet' 
                : `${totalItems} ${totalItems === 1 ? 'item' : 'items'} saved`
              }
            </p>
          </div>
        </div>
        
        {totalItems > 0 && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} />
            <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistHeader;
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyWishlist = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-8 text-center">
      <div className="max-w-md mx-auto">
        {/* Empty State Icon */}
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Heart" size={48} className="text-muted-foreground" />
        </div>

        {/* Empty State Content */}
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Your wishlist is empty
        </h2>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Start building your wishlist by browsing our product catalog. 
          Save items you love for future consideration and easy access.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/product-discovery-home">
            <Button variant="default" size="lg" className="w-full sm:w-auto">
              <Icon name="Search" size={18} className="mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>

        {/* Features List */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Why use a wishlist?
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <Icon name="Bookmark" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                Save items for later
              </span>
            </div>
            
            <div className="flex items-start space-x-2">
              <Icon name="TrendingDown" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                Track price changes
              </span>
            </div>
            
            <div className="flex items-start space-x-2">
              <Icon name="Share2" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                Share with friends
              </span>
            </div>
            
            <div className="flex items-start space-x-2">
              <Icon name="ShoppingCart" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                Quick purchase access
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyWishlist;
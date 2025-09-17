import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const WishlistControls = ({ 
  sortBy, 
  onSortChange, 
  selectedItems, 
  onBulkRemove, 
  onSelectAll, 
  onClearSelection,
  totalItems 
}) => {
  const sortOptions = [
    { value: 'dateAdded', label: 'Date Added' },
    { value: 'priceAsc', label: 'Price: Low to High' },
    { value: 'priceDesc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Rating' },
    { value: 'name', label: 'Name' }
  ];

  const hasSelectedItems = selectedItems?.length > 0;
  const allSelected = selectedItems?.length === totalItems && totalItems > 0;

  if (totalItems === 0) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Sort Controls */}
        <div className="flex items-center space-x-4">
          <Select
            label=""
            placeholder="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            className="w-48"
          />
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center space-x-2">
          {hasSelectedItems ? (
            <>
              <span className="text-sm text-muted-foreground">
                {selectedItems?.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={onClearSelection}
                iconName="X"
                iconSize={14}
              >
                Clear
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={onBulkRemove}
                iconName="Trash2"
                iconSize={14}
              >
                Remove Selected
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onSelectAll}
              iconName="CheckSquare"
              iconSize={14}
            >
              Select All
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistControls;
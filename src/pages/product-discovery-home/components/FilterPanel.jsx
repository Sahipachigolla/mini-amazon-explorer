import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  isMobile = false,
  isExpanded = false,
  onToggleExpanded 
}) => {
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'Books', label: 'Books' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'Accessories', label: 'Accessories' }
  ];

  const ratingOptions = [
    { value: '', label: 'Any Rating' },
    { value: '1', label: '1+ Stars' },
    { value: '2', label: '2+ Stars' },
    { value: '3', label: '3+ Stars' },
    { value: '4', label: '4+ Stars' },
    { value: '5', label: '5 Stars Only' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = filters?.category || filters?.maxPrice || filters?.minRating;

  const FilterContent = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => handleFilterChange('category', value)}
          placeholder="Select category"
        />
        
        <Input
          label="Max Price ($)"
          type="number"
          placeholder="Enter max price"
          value={filters?.maxPrice}
          onChange={(e) => handleFilterChange('maxPrice', e?.target?.value)}
          min="0"
          step="0.01"
        />
        
        <Select
          label="Minimum Rating"
          options={ratingOptions}
          value={filters?.minRating}
          onChange={(value) => handleFilterChange('minRating', value)}
          placeholder="Select rating"
        />
      </div>
      
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={onToggleExpanded}
          className="w-full justify-between"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          <div className="flex items-center">
            <Icon name="Filter" size={16} className="mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                {Object.values(filters)?.filter(Boolean)?.length}
              </span>
            )}
          </div>
        </Button>
        {isExpanded && (
          <div className="mt-4 p-4 bg-card border border-border rounded-lg">
            <FilterContent />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 bg-card border border-border rounded-lg">
      <div className="flex items-center mb-4">
        <Icon name="Filter" size={20} className="mr-2 text-foreground" />
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <span className="ml-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
            {Object.values(filters)?.filter(Boolean)?.length}
          </span>
        )}
      </div>
      <FilterContent />
    </div>
  );
};

export default FilterPanel;
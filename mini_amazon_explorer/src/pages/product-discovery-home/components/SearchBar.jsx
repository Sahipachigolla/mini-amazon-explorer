import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ searchQuery, onSearchChange, onSearchSubmit }) => {
  const handleSubmit = (e) => {
    e?.preventDefault();
    onSearchSubmit();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="search"
          placeholder="Search products by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full pr-12 h-12 text-base"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Icon name="Search" size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
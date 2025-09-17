import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingState = () => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="Package" size={24} className="text-primary animate-pulse" />
        </div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Loading Products
        </h3>
        <p className="text-muted-foreground">
          Discovering amazing deals for you...
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
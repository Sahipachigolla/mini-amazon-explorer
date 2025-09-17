import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProductImageGallery = ({ images, productName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images?.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images?.length - 1 ? 0 : prev + 1
    );
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-white rounded-lg border border-border overflow-hidden">
        <div className="aspect-square relative group cursor-pointer" onClick={handleImageClick}>
          <Image
            src={images?.[currentImageIndex]}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
          />
          
          {/* Zoom Indicator */}
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
          </div>

          {/* Navigation Arrows - Only show if multiple images */}
          {images?.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  handlePreviousImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              
              <button
                onClick={(e) => {
                  e?.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images?.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images?.length}
            </div>
          )}
        </div>
      </div>
      {/* Thumbnail Gallery - Only show if multiple images */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md border-2 overflow-hidden transition-all duration-200 ${
                index === currentImageIndex
                  ? 'border-primary shadow-md'
                  : 'border-border hover:border-muted-foreground'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
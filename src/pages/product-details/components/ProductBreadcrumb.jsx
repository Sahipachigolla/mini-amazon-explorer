import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ProductBreadcrumb = ({ product }) => {
  const breadcrumbItems = [
    { label: 'Home', path: '/product-discovery-home' },
    { label: product?.category || 'Category', path: `/product-discovery-home?category=${product?.category}` },
    { label: product?.name || 'Product', path: null }
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbItems?.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {item?.path ? (
            <Link
              to={item?.path}
              className="hover:text-foreground transition-colors duration-200 truncate max-w-[200px]"
            >
              {item?.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {item?.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default ProductBreadcrumb;
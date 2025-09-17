import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserMenu = ({ isAuthenticated, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef?.current && !menuRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <Link to="/user-login">
          <Button 
            variant="ghost" 
            size="sm"
            className={isActivePath('/user-login') ? 'bg-muted' : ''}
          >
            <Icon name="LogIn" size={16} className="mr-2" />
            Sign In
          </Button>
        </Link>
        <Link to="/user-registration">
          <Button 
            variant="default" 
            size="sm"
            className={isActivePath('/user-registration') ? 'bg-primary/90' : ''}
          >
            <Icon name="UserPlus" size={16} className="mr-2" />
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        onClick={handleToggle}
        className="flex items-center space-x-2 hover:bg-muted transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="User" size={16} color="white" />
        </div>
        <div className="hidden sm:block">
          <span className="text-sm font-medium text-foreground">
            {user?.name || user?.email || 'Account'}
          </span>
        </div>
        <Icon 
          name="ChevronDown" 
          size={14} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-elevation-2 z-[1001] animate-fade-in">
          <div className="py-2">
            {/* User Info */}
            <div className="px-4 py-2 border-b border-border">
              <p className="text-sm font-medium text-popover-foreground">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <Link
                to="/user-wishlist"
                onClick={handleMenuItemClick}
                className={`flex items-center px-4 py-2 text-sm transition-colors duration-200 ${
                  isActivePath('/user-wishlist')
                    ? 'bg-accent text-accent-foreground' :'text-popover-foreground hover:bg-muted'
                }`}
              >
                <Icon name="Heart" size={16} className="mr-3" />
                <span>My Wishlist</span>
                {isActivePath('/user-wishlist') && (
                  <Icon name="Check" size={14} className="ml-auto" />
                )}
              </Link>

              <Link
                to="/product-discovery-home"
                onClick={handleMenuItemClick}
                className={`flex items-center px-4 py-2 text-sm transition-colors duration-200 ${
                  isActivePath('/product-discovery-home')
                    ? 'bg-accent text-accent-foreground' :'text-popover-foreground hover:bg-muted'
                }`}
              >
                <Icon name="Package" size={16} className="mr-3" />
                <span>Browse Products</span>
                {isActivePath('/product-discovery-home') && (
                  <Icon name="Check" size={14} className="ml-auto" />
                )}
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-border pt-1">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
              >
                <Icon name="LogOut" size={16} className="mr-3" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
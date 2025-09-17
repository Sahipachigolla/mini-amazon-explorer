import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/product-discovery-home?search=${encodeURIComponent(searchQuery?.trim())}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e?.target?.value);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    setIsUserMenuOpen(false);
    navigate('/product-discovery-home');
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card border-b border-border shadow-elevation-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/product-discovery-home" 
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Package" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground">
                Mini Amazon
              </span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pr-12"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                >
                  <Icon name="Search" size={16} />
                </Button>
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Browse Products */}
            <Link
              to="/product-discovery-home"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActivePath('/product-discovery-home')
                  ? 'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Browse
            </Link>

            {/* User Menu */}
            <div className="relative">
              {isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2"
                  >
                    <Icon name="User" size={16} />
                    <span className="text-sm">{user?.name || 'Account'}</span>
                    <Icon name="ChevronDown" size={14} />
                  </Button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevation-2 z-[1001]">
                      <div className="py-1">
                        <Link
                          to="/user-wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                            isActivePath('/user-wishlist')
                              ? 'bg-accent text-accent-foreground' :'text-popover-foreground hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon name="Heart" size={16} />
                            <span>Wishlist</span>
                          </div>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                        >
                          <div className="flex items-center space-x-2">
                            <Icon name="LogOut" size={16} />
                            <span>Sign Out</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/user-login">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/user-registration">
                    <Button variant="default" size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pr-12"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              >
                <Icon name="Search" size={16} />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-popover border-t border-border z-[1002]">
          <div className="px-4 py-6 space-y-4">
            {/* Browse Products */}
            <Link
              to="/product-discovery-home"
              onClick={closeMobileMenu}
              className={`block px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                isActivePath('/product-discovery-home')
                  ? 'bg-primary text-primary-foreground' :'text-popover-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name="Package" size={20} />
                <span>Browse Products</span>
              </div>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/user-wishlist"
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActivePath('/user-wishlist')
                      ? 'bg-accent text-accent-foreground' :'text-popover-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="Heart" size={20} />
                    <span>Wishlist</span>
                  </div>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 rounded-md text-base font-medium text-popover-foreground hover:bg-muted transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="LogOut" size={20} />
                    <span>Sign Out</span>
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/user-login"
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActivePath('/user-login')
                      ? 'bg-primary text-primary-foreground' :'text-popover-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="LogIn" size={20} />
                    <span>Sign In</span>
                  </div>
                </Link>
                
                <Link
                  to="/user-registration"
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActivePath('/user-registration')
                      ? 'bg-primary text-primary-foreground' :'text-popover-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name="UserPlus" size={20} />
                    <span>Sign Up</span>
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
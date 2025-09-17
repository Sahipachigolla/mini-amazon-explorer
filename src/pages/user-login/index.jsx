import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import MockCredentialsInfo from './components/MockCredentialsInfo';

const UserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser?.email) {
          // User is already authenticated, redirect to home
          navigate('/product-discovery-home', { replace: true });
          return;
        }
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }

    // Set page title
    document.title = 'Sign In - Mini Amazon Explorer';
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
            {/* Main Login Section */}
            <div className="w-full max-w-md">
              <LoginForm />
              <MockCredentialsInfo />
            </div>

            {/* Additional Information */}
            <div className="mt-8 text-center max-w-md">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">M</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Mini Amazon Explorer
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Discover amazing products with seamless Amazon integration. 
                  Sign in to save your favorite items to your wishlist and get personalized recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} Mini Amazon Explorer. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Secure authentication powered by JWT technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserLogin;
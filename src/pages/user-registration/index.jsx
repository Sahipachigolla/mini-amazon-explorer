import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import RegistrationForm from './components/RegistrationForm';
import SecurityFeatures from './components/SecurityFeatures';
import RegistrationBenefits from './components/RegistrationBenefits';
import Icon from '../../components/AppIcon';

const UserRegistration = () => {
  const location = useLocation();
  const message = location?.state?.message;

  useEffect(() => {
    document.title = 'Create Account - Mini Amazon Explorer';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Welcome Message */}
        {message && (
          <div className="bg-accent/10 border-b border-accent/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={16} className="text-accent" />
                <p className="text-sm text-accent font-medium">{message}</p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Package" size={32} color="white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Join Mini Amazon Explorer
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create your account to unlock personalized product discovery features and build your wishlist
              </p>
            </div>

            {/* Registration Form Section */}
            <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12">
              <RegistrationForm />
              <SecurityFeatures />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <RegistrationBenefits />
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-muted/30 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Trusted by Product Enthusiasts
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={20} className="text-success" />
                  <span className="text-sm font-medium text-foreground">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={20} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">10,000+ Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Star" size={20} className="text-warning" />
                  <span className="text-sm font-medium text-foreground">4.8/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={20} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Icon name="Package" size={14} color="white" />
              </div>
              <span className="font-semibold text-foreground">Mini Amazon Explorer</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Discover amazing products with ease and shop directly on Amazon
            </p>
            <div className="flex justify-center items-center space-x-6 text-xs text-muted-foreground">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>© {new Date()?.getFullYear()} Mini Amazon Explorer</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserRegistration;
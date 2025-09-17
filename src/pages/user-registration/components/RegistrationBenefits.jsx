import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationBenefits = () => {
  const benefits = [
    {
      icon: "Heart",
      title: "Personal Wishlist",
      description: "Save your favorite products and never lose track of items you want to buy"
    },
    {
      icon: "Filter",
      title: "Advanced Filtering",
      description: "Access powerful search and filter tools to find exactly what you need"
    },
    {
      icon: "Star",
      title: "Personalized Experience",
      description: "Get product recommendations based on your browsing history and preferences"
    },
    {
      icon: "Zap",
      title: "Quick Amazon Access",
      description: "Seamlessly redirect to Amazon for instant purchasing with one click"
    }
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Why Create an Account?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Unlock powerful features that make your product discovery experience more personalized and efficient
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits?.map((benefit, index) => (
          <div 
            key={index} 
            className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-shadow duration-200"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={benefit?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  {benefit?.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full">
          <Icon name="Clock" size={16} className="text-accent" />
          <span className="text-sm font-medium text-accent">
            Registration takes less than 2 minutes
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationBenefits;
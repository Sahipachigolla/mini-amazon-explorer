import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = () => {
  const securityFeatures = [
    {
      icon: "Shield",
      title: "Data Encryption",
      description: "Your personal information is protected with industry-standard SSL encryption"
    },
    {
      icon: "Lock",
      title: "Secure Authentication",
      description: "Advanced password requirements and secure session management"
    },
    {
      icon: "Eye",
      title: "Privacy First",
      description: "We never share your data with third parties or use it for advertising"
    },
    {
      icon: "CheckCircle",
      title: "Verified Platform",
      description: "Trusted by thousands of users for secure product discovery"
    }
  ];

  return (
    <div className="hidden lg:block w-full max-w-md">
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={24} color="white" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Secure & Trusted</h2>
          <p className="text-muted-foreground text-sm">
            Your security and privacy are our top priorities
          </p>
        </div>

        <div className="space-y-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Icon name={feature?.icon} size={16} className="text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground text-sm mb-1">
                  {feature?.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-md">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Join 10,000+ Users</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Thousands of users trust Mini Amazon Explorer for their product discovery needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;
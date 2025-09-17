import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MockCredentialsInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockCredentials = [
    { 
      email: 'john.doe@example.com', 
      password: 'password123', 
      name: 'John Doe',
      role: 'Regular User'
    },
    { 
      email: 'jane.smith@example.com', 
      password: 'secure456', 
      name: 'Jane Smith',
      role: 'Regular User'
    },
    { 
      email: 'admin@minamazon.com', 
      password: 'admin789', 
      name: 'Admin User',
      role: 'Administrator'
    }
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-accent" />
            <h3 className="text-sm font-medium text-foreground">
              Demo Credentials
            </h3>
          </div>
          <Button
            variant="ghost"
            size="xs"
            onClick={toggleExpanded}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            iconSize={14}
          >
            {isExpanded ? 'Hide' : 'Show'}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mb-3">
          Use these test accounts to explore the application features
        </p>

        {isExpanded && (
          <div className="space-y-3">
            {mockCredentials?.map((cred, index) => (
              <div key={index} className="bg-card border border-border rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-foreground">
                    {cred?.name}
                  </span>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {cred?.role}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={12} className="text-muted-foreground" />
                    <span className="text-xs font-data text-foreground">
                      {cred?.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Key" size={12} className="text-muted-foreground" />
                    <span className="text-xs font-data text-foreground">
                      {cred?.password}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded-md">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={12} className="text-warning mt-0.5" />
                <p className="text-xs text-warning">
                  These are demo credentials for testing purposes only. In production, use your actual account credentials.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockCredentialsInfo;
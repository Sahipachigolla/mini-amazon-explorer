import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  };

  const validatePassword = (password) => {
    return password?.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData?.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock registration success
      const userData = {
        id: Date.now(),
        name: formData?.fullName,
        email: formData?.email,
        registeredAt: new Date()?.toISOString()
      };

      // Store user data and auth token
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());
      localStorage.setItem('userData', JSON.stringify(userData));

      // Navigate to product discovery home
      navigate('/product-discovery-home', { 
        state: { message: 'Account created successfully! Welcome to Mini Amazon Explorer.' }
      });

    } catch (error) {
      setErrors({ 
        general: 'Registration failed. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!formData?.password) return null;
    
    const hasLength = formData?.password?.length >= 8;
    const hasUpper = /[A-Z]/?.test(formData?.password);
    const hasLower = /[a-z]/?.test(formData?.password);
    const hasNumber = /\d/?.test(formData?.password);
    
    const score = [hasLength, hasUpper, hasLower, hasNumber]?.filter(Boolean)?.length;
    
    if (score < 2) return { strength: 'Weak', color: 'text-error' };
    if (score < 4) return { strength: 'Medium', color: 'text-warning' };
    return { strength: 'Strong', color: 'text-success' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="UserPlus" size={24} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground text-sm">
            Join Mini Amazon Explorer to save your favorite products
          </p>
        </div>

        {/* General Error */}
        {errors?.general && (
          <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-md">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData?.fullName}
            onChange={handleInputChange}
            error={errors?.fullName}
            required
            disabled={isLoading}
          />

          {/* Email */}
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            description="We'll never share your email with anyone"
            required
            disabled={isLoading}
          />

          {/* Password */}
          <div>
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
              disabled={isLoading}
            />
            {passwordStrength && (
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      passwordStrength?.strength === 'Weak' ? 'w-1/3 bg-error' :
                      passwordStrength?.strength === 'Medium'? 'w-2/3 bg-warning' : 'w-full bg-success'
                    }`}
                  />
                </div>
                <span className={`text-xs font-medium ${passwordStrength?.color}`}>
                  {passwordStrength?.strength}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            required
            disabled={isLoading}
          />

          {/* Security Notice */}
          <div className="p-3 bg-muted/50 rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="Shield" size={16} className="text-accent flex-shrink-0 mt-0.5" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium mb-1">Your data is secure</p>
                <p>We use industry-standard encryption to protect your personal information and never share it with third parties.</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            iconName="UserPlus"
            iconPosition="left"
            className="mt-6"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link 
              to="/user-login" 
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
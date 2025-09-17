import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import UserWishlist from './pages/user-wishlist';
import ProductDiscoveryHome from './pages/product-discovery-home';
import ProductDetails from './pages/product-details';
import UserRegistration from './pages/user-registration';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<ProductDetails />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-wishlist" element={<UserWishlist />} />
        <Route path="/product-discovery-home" element={<ProductDiscoveryHome />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

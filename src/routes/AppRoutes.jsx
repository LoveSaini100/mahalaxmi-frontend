import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Public Pages (Lazy Loaded)
const Home = lazy(() => import('../pages/Home'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const FounderMessage = lazy(() => import('../pages/FounderMessage'));
const AllProperties = lazy(() => import('../pages/AllProperties'));
const PropertyDetails = lazy(() => import('../pages/PropertyDetails'));
const ResidentialProperties = lazy(() => import('../pages/ResidentialProperties'));
const CommercialProperties = lazy(() => import('../pages/CommercialProperties'));
const PlotsLand = lazy(() => import('../pages/PlotsLand'));
const FeaturedPropertiesPage = lazy(() => import('../pages/FeaturedPropertiesPage'));
const WhyChooseUsPage = lazy(() => import('../pages/WhyChooseUsPage'));
const ServicesPage = lazy(() => import('../pages/ServicesPage'));
const TestimonialsPage = lazy(() => import('../pages/TestimonialsPage'));
const GalleryPage = lazy(() => import('../pages/GalleryPage'));
const FAQPage = lazy(() => import('../pages/FAQPage'));
const ContactUs = lazy(() => import('../pages/ContactUs'));
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('../pages/TermsConditions'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Admin Pages (Lazy Loaded)
const AdminLayout = lazy(() => import('../components/admin/AdminLayout'));
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminPropertiesList = lazy(() => import('../pages/admin/AdminPropertiesList'));
const AdminPropertyCreatePage = lazy(() => import('../pages/admin/AdminPropertyCreatePage'));
const AdminPropertyEditPage = lazy(() => import('../pages/admin/AdminPropertyEditPage'));
const AdminEnquiriesPage = lazy(() => import('../pages/admin/AdminEnquiriesPage'));
const AdminTestimonialsPage = lazy(() => import('../pages/admin/AdminTestimonialsPage'));
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage'));
const AdminGalleryPage = lazy(() => import('../pages/admin/AdminGalleryPage'));

// Layout Components
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import MobileDrawer from '../components/layout/MobileDrawer';
import StickyWhatsApp from '../components/layout/StickyWhatsApp';
import ToastContainer from '../components/common/ToastContainer';
import ScrollToTop from '../components/common/ScrollToTop';

// Fallback Spinner for Suspense
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-brand-offwhite">
    <div className="w-10 h-10 border-3 border-navy border-t-gold rounded-full animate-spin" />
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      <ToastContainer />

      {!isAdminRoute ? (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <MobileDrawer />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/founder-message" element={<FounderMessage />} />
                <Route path="/properties" element={<AllProperties />} />
                <Route path="/properties/:slug" element={<PropertyDetails />} />
                <Route path="/residential" element={<ResidentialProperties />} />
                <Route path="/commercial" element={<CommercialProperties />} />
                <Route path="/plots-land" element={<PlotsLand />} />
                <Route path="/featured" element={<FeaturedPropertiesPage />} />
                <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <StickyWhatsApp />
          <Footer />
        </div>
      ) : (
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="properties" element={<AdminPropertiesList />} />
              <Route path="properties/new" element={<AdminPropertyCreatePage />} />
              <Route path="properties/edit/:id" element={<AdminPropertyEditPage />} />
              <Route path="enquiries" element={<AdminEnquiriesPage />} />
              <Route path="gallery" element={<AdminGalleryPage />} />
              <Route path="testimonials" element={<AdminTestimonialsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
          </Routes>
        </Suspense>
      )}
    </>
  );
};

export default AppRoutes;

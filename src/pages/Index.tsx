
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import FeaturedProperties from '../components/home/FeaturedProperties';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import CitiesSection from '../components/home/CitiesSection';
import ContactSection from '../components/home/ContactSection';
import CeoMessage from '../components/home/CeoMessage';
import TestimonialsSection from '../components/home/TestimonialsSection';
import MortgageCalculator from '../components/home/MortgageCalculator';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/ui/WhatsAppButton';

const Index = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedProperties />
        <CeoMessage />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <CitiesSection />
        <TestimonialsSection />
        <MortgageCalculator />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="+917006064587" />
    </div>
  );
};

export default Index;

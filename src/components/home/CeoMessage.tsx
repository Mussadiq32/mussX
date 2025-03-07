
import { ArrowRight } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { cn } from '@/lib/utils';

const CeoMessage = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1 animate-fade-right">
            <div className="relative mx-auto max-w-md overflow-hidden rounded-lg border-4 border-gold-200 shadow-xl">
              <div className="absolute inset-0 bg-royal-800/10 hover:bg-royal-800/0 transition-all duration-500 z-10"></div>
              <img 
                src="https://iili.io/3FQ3Tzl.jpg" 
                alt="Basit Mashkor Wani - CEO" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          
          {/* Message */}
          <div className="order-1 lg:order-2 animate-fade-left">
            <div className="inline-block px-3 py-1 bg-gold-100 text-gold-600 text-sm font-medium rounded-full mb-4">
              Message from the CEO
            </div>
            <h2 className="heading-lg text-royal-800 mb-6">
              Leadership with <span className="text-gradient">Vision</span>
            </h2>
            <div className="text-lg font-display italic text-royal-700 mb-6 border-l-4 border-gold-400 pl-6">
              "With years of experience and dedication, we turn your real estate dreams into reality. At Royal Group of Real Estates, we don't just build properties; we create spaces where memories flourish and investments grow."
            </div>
            <p className="text-royal-600 mb-8">
              Our vision is to redefine the real estate landscape in India by offering premium properties that blend traditional values with modern living. We are committed to excellence, transparency, and customer satisfaction in every project we undertake.
            </p>
            <div className="flex items-center">
              <div>
                <h3 className="text-royal-800 font-semibold text-xl">Basit Mashkor</h3>
                <p className="text-royal-600">Founder & CEO</p>
              </div>
              <div className="ml-auto">
                <CustomButton 
                  variant="outline" 
                  icon={<ArrowRight size={18} />} 
                  iconPosition="right"
                >
                  About Us
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeoMessage;

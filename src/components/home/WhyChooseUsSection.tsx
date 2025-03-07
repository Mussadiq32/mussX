
import { GraduationCap, Home, Shield, Star, Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <GraduationCap className="h-10 w-10 text-gold-500" />,
      title: 'Expert Guidance',
      description: 'Professional advice from real estate experts with decades of combined experience.'
    },
    {
      icon: <Home className="h-10 w-10 text-gold-500" />,
      title: 'Wide Property Listings',
      description: 'Diverse options for buyers and investors across multiple cities and property types.'
    },
    {
      icon: <Shield className="h-10 w-10 text-gold-500" />,
      title: 'Legal Assistance',
      description: 'Comprehensive legal support ensuring smooth and secure transactions.'
    },
    {
      icon: <Star className="h-10 w-10 text-gold-500" />,
      title: 'Customer Satisfaction',
      description: 'Trusted by hundreds of clients with a proven track record of excellence.'
    },
    {
      icon: <Clock className="h-10 w-10 text-gold-500" />,
      title: 'Timely Delivery',
      description: 'We value your time and ensure prompt delivery of all our services.'
    },
    {
      icon: <Users className="h-10 w-10 text-gold-500" />,
      title: 'Client-Centric Approach',
      description: 'Your requirements and satisfaction are our top priorities.'
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <div className="inline-block px-3 py-1 bg-gold-100 text-gold-600 text-sm font-medium rounded-full mb-4">
            Why Choose Us
          </div>
          <h2 className="heading-lg text-royal-800 mb-6">
            What Makes Us <span className="text-gradient">Different</span>
          </h2>
          <p className="text-royal-600 max-w-3xl mx-auto">
            At Royal Group of Real Estate, we strive to provide exceptional service and unmatched expertise
            to make your property journey seamless and rewarding.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-up",
                "hover:border-gold-200 group"
              )}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-royal-800 mb-3">{feature.title}</h3>
              <p className="text-royal-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;

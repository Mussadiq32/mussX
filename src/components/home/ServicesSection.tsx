
import { Home, Building, Key, Coins, Users, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const ServiceCard = ({ icon, title, description, className }: ServiceCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group",
      className
    )}>
      <div className="w-14 h-14 rounded-lg bg-gold-50 flex items-center justify-center mb-6 text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-display font-semibold text-royal-800 mb-3">{title}</h3>
      <p className="text-royal-600">{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: <Home size={24} />,
      title: "Residential Properties",
      description: "Discover your dream home with our extensive range of residential properties, from luxury apartments to spacious villas."
    },
    {
      icon: <Building size={24} />,
      title: "Commercial Real Estate",
      description: "Premium office spaces and retail properties designed to maximize business potential in prime locations."
    },
    {
      icon: <Key size={24} />,
      title: "Property Management",
      description: "Comprehensive property management services ensuring hassle-free ownership and optimized returns."
    },
    {
      icon: <Coins size={24} />,
      title: "Investment Advisory",
      description: "Expert guidance on real estate investments to help you make informed decisions for maximum returns."
    },
    {
      icon: <Users size={24} />,
      title: "Consultation Services",
      description: "Personalized consultation to understand your requirements and find properties that perfectly match your needs."
    },
    {
      icon: <LineChart size={24} />,
      title: "Market Analysis",
      description: "In-depth market analysis and reports to keep you updated on the latest trends in the real estate market."
    }
  ];

  return (
    <section id="services" className="section-padding bg-royal-50/50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 bg-gold-100 text-gold-600 text-sm font-medium rounded-full mb-4 animate-fade-up">
            Our Services
          </div>
          <h2 className="heading-lg text-royal-800 mb-6 animate-fade-up animate-delay-100">
            Comprehensive <span className="text-gradient">Real Estate</span> Solutions
          </h2>
          <p className="text-royal-600 animate-fade-up animate-delay-200">
            Royal Group offers a wide range of property services designed to meet the diverse needs of our clients, from finding your dream home to making smart investment decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

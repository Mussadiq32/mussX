import { useState } from 'react';
import PropertyCard from '../ui/PropertyCard';
import CustomButton from '../ui/CustomButton';
import { ArrowRight } from 'lucide-react';

const FeaturedProperties = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'residential' | 'commercial'>('all');

  // Sample properties data with updated Unsplash city references
  const properties = [
    {
      id: '1',
      title: 'Luxury Villa with Garden',
      location: 'Srinagar, Jammu & Kashmir',
      price: '2.5 Cr',
      bedrooms: 4,
      bathrooms: 3,
      area: '3,500 sq.ft',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      featured: true,
      type: 'residential' as 'residential',
    },
    {
      id: '2',
      title: 'Modern Apartment with Skyline View',
      location: 'Bangalore, Karnataka',
      price: '1.8 Cr',
      bedrooms: 3,
      bathrooms: 2,
      area: '2,200 sq.ft',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      featured: false,
      type: 'residential' as 'residential',
    },
    {
      id: '3',
      title: 'Commercial Office Space',
      location: 'Delhi, Delhi NCR',
      price: '4.5 Cr',
      bedrooms: 0,
      bathrooms: 4,
      area: '5,000 sq.ft',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      featured: false,
      type: 'commercial' as 'commercial',
    },
    {
      id: '4',
      title: 'Penthouse with Private Terrace',
      location: 'Chandigarh',
      price: '3.2 Cr',
      bedrooms: 4,
      bathrooms: 4,
      area: '4,100 sq.ft',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      featured: false,
      type: 'residential' as 'residential',
    },
    {
      id: '5',
      title: 'Retail Space in Prime Location',
      location: 'Hyderabad, Telangana',
      price: '2.9 Cr',
      bedrooms: 0,
      bathrooms: 2,
      area: '2,800 sq.ft',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      featured: false,
      type: 'commercial' as 'commercial',
    },
    {
      id: '6',
      title: 'Luxury Apartment in City Center',
      location: 'Jammu, Jammu & Kashmir',
      price: '1.5 Cr',
      bedrooms: 3,
      bathrooms: 2,
      area: '2,100 sq.ft',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      featured: true,
      type: 'residential' as 'residential',
    },
  ];

  const filteredProperties = 
    activeTab === 'all' 
      ? properties 
      : properties.filter(property => property.type === activeTab);

  return (
    <section id="featured" className="section-padding bg-royal-50/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="heading-lg text-royal-800 mb-4 animate-fade-up">
              Featured <span className="text-gradient">Properties</span>
            </h2>
            <p className="text-royal-600 animate-fade-up animate-delay-200">
              Discover our handpicked selection of premium properties across India's most vibrant cities, featuring unmatched quality and exceptional value.
            </p>
          </div>
          
          <div className="flex mt-6 md:mt-0 animate-fade-up animate-delay-300">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm mr-2 transition-all duration-300 ${
                activeTab === 'all' 
                  ? 'bg-gold-500 text-white' 
                  : 'bg-white text-royal-700 hover:bg-royal-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('residential')}
              className={`px-4 py-2 rounded-full text-sm mr-2 transition-all duration-300 ${
                activeTab === 'residential' 
                  ? 'bg-gold-500 text-white' 
                  : 'bg-white text-royal-700 hover:bg-royal-100'
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setActiveTab('commercial')}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeTab === 'commercial' 
                  ? 'bg-gold-500 text-white' 
                  : 'bg-white text-royal-700 hover:bg-royal-100'
              }`}
            >
              Commercial
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, index) => (
            <div 
              key={property.id} 
              className="animate-fade-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12 animate-fade-up animate-delay-500">
          <CustomButton 
            variant="outline" 
            icon={<ArrowRight size={18} />} 
            iconPosition="right"
          >
            View All Properties
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronDown, Home, Building } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { cn } from '@/lib/utils';

const Hero = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'sell'>('buy');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.append('query', searchQuery);
    }
    
    if (selectedLocation) {
      params.append('location', selectedLocation);
    }
    
    if (selectedType) {
      params.append('type', selectedType);
    }
    
    // Redirect to properties page with search parameters
    navigate(`/properties?${params.toString()}`);
  };

  const handleSelectLocation = (city: string) => {
    setSelectedLocation(city);
    toggleDropdown('location');
  };

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    toggleDropdown('type');
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=3000" 
          alt="Luxury home" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto relative z-10 px-6 md:px-12 lg:px-24 py-16 mt-8">
        <div className="max-w-3xl animate-fade-up" style={{ animationDelay: '200ms' }}>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-semibold leading-tight mb-6">
            Find Your Dream <span className="text-gold-400">Property</span> in India's Finest Locations
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl">
            Discover premium properties across major Indian cities with Royal Group of Real Estate, your trusted partner in real estate excellence.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-lg shadow-xl p-1 max-w-4xl animate-fade-up" style={{ animationDelay: '400ms' }}>
          {/* Tabs */}
          <div className="flex mb-4 px-4 pt-4">
            <button 
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium mr-2 transition-all duration-300",
                activeTab === 'buy' ? "bg-gold-500 text-white" : "bg-gray-100 text-royal-700 hover:bg-gray-200"
              )}
              onClick={() => setActiveTab('buy')}
            >
              Buy
            </button>
            <button 
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium mr-2 transition-all duration-300",
                activeTab === 'rent' ? "bg-gold-500 text-white" : "bg-gray-100 text-royal-700 hover:bg-gray-200"
              )}
              onClick={() => setActiveTab('rent')}
            >
              Rent
            </button>
            <button 
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeTab === 'sell' ? "bg-gold-500 text-white" : "bg-gray-100 text-royal-700 hover:bg-gray-200"
              )}
              onClick={() => setActiveTab('sell')}
            >
              Sell
            </button>
          </div>
          
          {/* Search fields */}
          <div className="flex flex-col md:flex-row p-4 gap-4">
            <div className="flex-1 relative">
              <div 
                className="border border-gray-200 rounded-lg px-4 py-3 flex items-center cursor-pointer hover:border-gold-300 transition-colors duration-300"
                onClick={() => toggleDropdown('location')}
              >
                <MapPin size={20} className="text-gold-500 mr-3" />
                <div className="flex-1">
                  <div className="text-xs text-royal-600">Location</div>
                  <div className="text-royal-800 font-medium">
                    {selectedLocation || "Select City"}
                  </div>
                </div>
                <ChevronDown size={18} className="text-royal-400" />
              </div>
              
              {/* Location Dropdown */}
              <div className={cn(
                "absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-20 border border-gray-200 transition-all duration-300 transform origin-top",
                activeDropdown === 'location' ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              )}>
                <div className="p-2">
                  {['Srinagar', 'Jammu', 'Chandigarh', 'Delhi', 'Gurgaon', 'Bangalore', 'Hyderabad', 'Ahmedabad'].map((city) => (
                    <div 
                      key={city} 
                      className="px-4 py-2 hover:bg-royal-50 rounded-md cursor-pointer transition-colors duration-200 flex items-center"
                      onClick={() => handleSelectLocation(city)}
                    >
                      <MapPin size={16} className="text-gold-500 mr-2" />
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div 
                className="border border-gray-200 rounded-lg px-4 py-3 flex items-center cursor-pointer hover:border-gold-300 transition-colors duration-300"
                onClick={() => toggleDropdown('type')}
              >
                <Home size={20} className="text-gold-500 mr-3" />
                <div className="flex-1">
                  <div className="text-xs text-royal-600">Property Type</div>
                  <div className="text-royal-800 font-medium">
                    {selectedType || "Select Type"}
                  </div>
                </div>
                <ChevronDown size={18} className="text-royal-400" />
              </div>
              
              {/* Property Type Dropdown */}
              <div className={cn(
                "absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-20 border border-gray-200 transition-all duration-300 transform origin-top",
                activeDropdown === 'type' ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              )}>
                <div className="p-2">
                  {[
                    { name: 'Residential', icon: <Home size={16} className="text-gold-500 mr-2" /> },
                    { name: 'Commercial', icon: <Building size={16} className="text-gold-500 mr-2" /> },
                    { name: 'Apartment', icon: <Building size={16} className="text-gold-500 mr-2" /> },
                    { name: 'Villa', icon: <Home size={16} className="text-gold-500 mr-2" /> },
                    { name: 'Land', icon: <MapPin size={16} className="text-gold-500 mr-2" /> },
                  ].map((type) => (
                    <div 
                      key={type.name} 
                      className="px-4 py-2 hover:bg-royal-50 rounded-md cursor-pointer transition-colors duration-200 flex items-center"
                      onClick={() => handleSelectType(type.name.toLowerCase())}
                    >
                      {type.icon}
                      {type.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex-1 md:flex-initial">
              <input
                type="text"
                placeholder="Search by keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-300 transition-colors duration-300"
              />
            </div>
            
            <CustomButton
              className="md:w-auto w-full"
              icon={<Search size={18} />}
              onClick={handleSearch}
            >
              Search
            </CustomButton>
          </div>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="bg-white/90 backdrop-blur-md border-t border-gray-100 py-6 relative z-10 mt-auto">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center animate-fade-up" style={{ animationDelay: '600ms' }}>
              <div className="text-gold-500 font-display text-3xl md:text-4xl font-bold">8+</div>
              <div className="text-royal-700 text-sm md:text-base">Major Cities</div>
            </div>
            <div className="text-center animate-fade-up" style={{ animationDelay: '700ms' }}>
              <div className="text-gold-500 font-display text-3xl md:text-4xl font-bold">500+</div>
              <div className="text-royal-700 text-sm md:text-base">Properties</div>
            </div>
            <div className="text-center animate-fade-up" style={{ animationDelay: '800ms' }}>
              <div className="text-gold-500 font-display text-3xl md:text-4xl font-bold">1.2K+</div>
              <div className="text-royal-700 text-sm md:text-base">Happy Clients</div>
            </div>
            <div className="text-center animate-fade-up" style={{ animationDelay: '900ms' }}>
              <div className="text-gold-500 font-display text-3xl md:text-4xl font-bold">15+</div>
              <div className="text-royal-700 text-sm md:text-base">Years of Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

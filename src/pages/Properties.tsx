
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PropertyCard from '../components/ui/PropertyCard';
import { searchProperties } from '@/lib/supabase';
import CustomButton from '@/components/ui/CustomButton';
import { Search, MapPin, Home, ArrowUpDown, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  
  // Get search parameters from URL
  const initialQuery = searchParams.get('query') || '';
  const initialLocation = searchParams.get('location') || 'all';
  const initialMinPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const initialMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const initialType = searchParams.get('type') as 'residential' | 'commercial' | 'all' || 'all';
  const initialSort = searchParams.get('sort') as 'price_asc' | 'price_desc' | 'newest' || 'newest';

  // Local state for form values
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const [minPrice, setMinPrice] = useState<number | undefined>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(initialMaxPrice);
  const [type, setType] = useState<'residential' | 'commercial' | 'all'>(initialType);
  const [sort, setSort] = useState<'price_asc' | 'price_desc' | 'newest'>(initialSort);

  // Query to fetch properties with filters
  const { data: propertiesData, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['properties', initialQuery, initialLocation, initialMinPrice, initialMaxPrice, initialType, initialSort],
    queryFn: () => searchProperties(
      initialQuery !== '' ? initialQuery : undefined,
      initialLocation !== 'all' ? initialLocation : undefined,
      initialMinPrice,
      initialMaxPrice,
      initialType !== 'all' ? initialType as 'residential' | 'commercial' : undefined,
      initialSort
    ),
  });

  // Handle form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL search parameters
    const newSearchParams = new URLSearchParams();
    if (query) newSearchParams.set('query', query);
    if (location !== 'all') newSearchParams.set('location', location);
    if (minPrice) newSearchParams.set('minPrice', minPrice.toString());
    if (maxPrice) newSearchParams.set('maxPrice', maxPrice.toString());
    if (type !== 'all') newSearchParams.set('type', type);
    if (sort) newSearchParams.set('sort', sort);
    
    setSearchParams(newSearchParams);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setQuery('');
    setLocation('all');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setType('all');
    setSort('newest');
    setSearchParams({});
  };

  // Display error if query fails
  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Error Fetching Properties",
        description: (error as Error).message || "There was an error fetching the properties. Please try again.",
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-royal-50 pt-28 pb-12">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <div className="max-w-3xl animate-fade-up">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-royal-800 font-semibold leading-tight mb-6">
                Find Your Perfect <span className="text-gold-500">Property</span>
              </h1>
              <p className="text-royal-600 text-lg mb-8 max-w-2xl">
                Browse our curated collection of premium properties across India's finest locations.
              </p>
            </div>
          </div>
        </section>
        
        {/* Search & Filter Section */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            <form onSubmit={handleSearch} className="grid grid-cols-1 lg:grid-cols-6 gap-6">
              {/* Search Input */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-royal-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
              </div>
              
              {/* Location Filter */}
              <div className="lg:col-span-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-royal-400" size={18} />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none bg-white"
                  >
                    <option value="all">All Locations</option>
                    <option value="Srinagar">Srinagar</option>
                    <option value="Jammu">Jammu</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                  </select>
                </div>
              </div>
              
              {/* Property Type Filter */}
              <div className="lg:col-span-1">
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-royal-400" size={18} />
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'residential' | 'commercial' | 'all')}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 appearance-none bg-white"
                  >
                    <option value="all">All Types</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>
              
              {/* Price Range Filters */}
              <div className="lg:col-span-1">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={minPrice || ''}
                  onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>
              
              <div className="lg:col-span-1">
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice || ''}
                    onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                  <CustomButton
                    type="submit"
                    className="px-4"
                    icon={<Search size={18} />}
                  >
                    Search
                  </CustomButton>
                </div>
              </div>
            </form>
            
            {/* Sort and Reset Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6">
              <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                <ArrowUpDown size={16} className="text-royal-500" />
                <span className="text-royal-700 font-medium">Sort:</span>
                <select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value as 'price_asc' | 'price_desc' | 'newest');
                    // Update URL parameter immediately
                    searchParams.set('sort', e.target.value);
                    setSearchParams(searchParams);
                  }}
                  className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
              
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center text-royal-600 hover:text-royal-800 text-sm"
              >
                <X size={16} className="mr-1" />
                Reset Filters
              </button>
            </div>
          </div>
        </section>
        
        {/* Property Results */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12 lg:px-24">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 size={40} className="animate-spin text-gold-500" />
              </div>
            ) : propertiesData?.data && propertiesData.data.length > 0 ? (
              <>
                <div className="mb-8 flex justify-between items-center">
                  <h2 className="text-2xl font-display font-semibold text-royal-800">
                    {propertiesData.data.length} Properties Found
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {propertiesData.data.map((property: any) => (
                    <div key={property.id} className="animate-fade-up">
                      <PropertyCard
                        id={property.id.toString()}
                        title={property.title}
                        location={property.location}
                        price={property.price.toString()}
                        bedrooms={property.bedrooms || 0}
                        bathrooms={property.bathrooms || 0}
                        area={property.area || "N/A"}
                        image={property.image_url || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200"}
                        type={property.type || "residential"}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="mb-4">
                  <Search size={50} className="mx-auto text-royal-300" />
                </div>
                <h3 className="text-2xl font-display font-medium text-royal-700 mb-2">No Properties Found</h3>
                <p className="text-royal-500 max-w-md mx-auto mb-6">
                  We couldn't find any properties matching your search criteria. Try adjusting your filters or search terms.
                </p>
                <CustomButton onClick={handleResetFilters} variant="outline">
                  Reset All Filters
                </CustomButton>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton phoneNumber="+917006064587" />
    </div>
  );
};

export default Properties;


import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CityCardProps {
  name: string;
  image: string;
  properties: number;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isActive?: boolean;
}

const CityCard = ({ 
  name, 
  image, 
  properties, 
  className,
  onMouseEnter,
  onMouseLeave,
  isActive = false
}: CityCardProps) => {
  const [animatedProperties, setAnimatedProperties] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 20;
    const increment = properties / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= properties) {
        setAnimatedProperties(properties);
        clearInterval(timer);
      } else {
        setAnimatedProperties(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [properties]);

  return (
    <motion.div 
      className={cn(
        "relative rounded-lg overflow-hidden cursor-pointer group h-80",
        isActive ? "shadow-2xl z-10" : "shadow-lg",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: isActive ? 1.05 : 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Image with parallax effect */}
      <motion.div 
        className="absolute inset-0"
        animate={{ y: isActive ? -10 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-royal-900/90 via-royal-900/40 to-transparent transition-opacity duration-500",
          isActive ? "opacity-60" : "opacity-80 group-hover:opacity-60"
        )}></div>
        <motion.img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.7 }}
        />
      </motion.div>
      
      {/* Content with animated entrance */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 p-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h3
          className={cn(
            "font-display text-2xl font-semibold text-white mb-3",
            "transform transition-transform duration-500"
          )}
          animate={{ y: isActive ? 0 : 10 }}
        >
          {name}
        </motion.h3>
        <motion.div
          className="flex items-center text-white/90 space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center">
            <MapPin size={16} className="mr-2" />
            <span className="font-medium">{animatedProperties} Properties</span>
          </div>
          <motion.button
            className="px-4 py-2 bg-gold-500/90 hover:bg-gold-500 rounded-full text-sm font-medium transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const CitiesSection = () => {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  
  const cities = [
    {
      name: "Delhi",
      image: "https://images.unsplash.com/photo-1595928607828-6fdaee9c0942?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      properties: 120
    },
    {
      name: "Bangalore",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      properties: 98
    },
    {
      name: "Hyderabad",
      image: "https://images.unsplash.com/photo-1696488331221-1e08719a3a6c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      properties: 85
    },
    {
      name: "Gurgaon",
      image: "https://images.unsplash.com/photo-1562566932-bfdfd81dd480?q=80&w=2316&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      properties: 100
    },
    {
      name: "Chandigarh",
      image: "https://plus.unsplash.com/premium_photo-1677048147210-115117c6aea2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      properties: 100
    },
    {
      name: "Srinagar",
      image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3JpbmFnYXJ8ZW58MHx8MHx8fDA%3D",
      properties: 100
    },
    {
      name: "Jammu",
      image: "https://img.etimg.com/thumb/msid-94202816,width-640,height-480,imgsize-63816,resizemode-4/remarkable-achievement.jpg",
      properties: 38
    },
    {
      name: "Ahmedabad",
      image: "https://content.jdmagicbox.com/comp/ahmedabad/e6/079pxx79.xx79.201112112825.e4e6/catalogue/taj-skyline-bodakdev-ahmedabad-hotels-1gk28lttx1.jpg",
      properties: 67
    }
  ];

  return (
    <section className="section-padding overflow-hidden">
      <motion.div 
        className="container mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            className="inline-block px-3 py-1 bg-gold-100 text-gold-600 text-sm font-medium rounded-full mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Our Locations
          </motion.div>
          <motion.h2 
            className="heading-lg text-royal-800 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore Properties Across <span className="text-gradient">Major Cities</span>
          </motion.h2>
          <motion.p 
            className="text-royal-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Discover premium real estate opportunities in India's most vibrant and growing cities, each offering unique lifestyle and investment advantages.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <AnimatePresence>
            {cities.map((city, index) => (
              <motion.div 
                key={city.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CityCard
                  name={city.name}
                  image={city.image}
                  properties={city.properties}
                  onMouseEnter={() => setActiveCity(city.name)}
                  onMouseLeave={() => setActiveCity(null)}
                  isActive={activeCity === city.name}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CitiesSection;

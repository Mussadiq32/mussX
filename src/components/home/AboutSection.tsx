import { useState, useEffect } from 'react';
import CustomButton from '../ui/CustomButton';
import { CheckCircle, ArrowUpRight, Building, Users, Award, Clock, MapPin, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState("vision");
  const [animatedStats, setAnimatedStats] = useState({
    years: 0,
    cities: 0,
    clients: 0,
    projects: 0
  });
  
  const achievements = [
    '15+ years of excellence in real estate',
    'Presence in 8 major Indian cities',
    'Over 1,200 satisfied clients',
    'Award-winning property developments',
    'Expert team of real estate professionals',
    'Commitment to sustainable development'
  ];

  const milestones = [
    { year: 2012, title: 'Founded in J&K', description: 'Royal Group established its 0ffice in J&K' },
    { year: 2012, title: 'Expansion to Delhi', description: 'Opened our second major office in the capital' },
    { year: 2015, title: 'First Luxury Project', description: 'Launched Royal Heights, our first premium residential tower' },
    { year: 2018, title: '06 Year Anniversary', description: 'Celebrated a decade of excellence with 500+ completed properties' },
    { year: 2020, title: 'Sustainability Initiative', description: 'Committed to eco-friendly construction practices' },
    { year: 2025, title: 'Digital Transformation', description: 'Launched virtual property tours and digital sales platform' }
  ];

  const stats = [
    { icon: <Clock className="w-6 h-6 text-gold-500" />, value: 15, label: 'Years of Excellence', suffix: '+' },
    { icon: <MapPin className="w-6 h-6 text-gold-500" />, value: 8, label: 'Major Cities', suffix: '' },
    { icon: <Users className="w-6 h-6 text-gold-500" />, value: 1200, label: 'Satisfied Clients', suffix: '+' },
    { icon: <Building className="w-6 h-6 text-gold-500" />, value: 75, label: 'Premium Projects', suffix: '+' }
  ];

  // Animate stats when in view
  useEffect(() => {
    const animateStats = () => {
      const duration = 2000; // 2 seconds
      const steps = 50;
      const interval = duration / steps;
      
      let counter = 0;
      const timer = setInterval(() => {
        counter++;
        setAnimatedStats({
          years: Math.ceil((15 * counter) / steps),
          cities: Math.ceil((8 * counter) / steps),
          clients: Math.ceil((1200 * counter) / steps),
          projects: Math.ceil((75 * counter) / steps)
        });
        
        if (counter >= steps) {
          clearInterval(timer);
        }
      }, interval);
      
      return () => clearInterval(timer);
    };
    
    animateStats();
  }, []);

  return (
    <section id="about" className="section-padding overflow-hidden bg-gradient-to-b from-white to-royal-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 bg-gold-100 text-gold-600 text-sm font-medium rounded-full mb-4 animate-fade-up">
            About Royal Group
          </div>
          <h2 className="heading-lg text-royal-800 mb-6 animate-fade-up animate-delay-100">
            Building <span className="text-gradient">Excellence</span> in Real Estate Since 2012
          </h2>
          <p className="text-royal-600 animate-fade-up animate-delay-200">
            Royal Group of Real Estate has established itself as a premier real estate developer across India's most vibrant cities. With a legacy of excellence and innovation, we've been transforming skylines and creating inspiring spaces.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md border border-royal-100 text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-royal-800 mb-1">
                {index === 0 ? animatedStats.years : 
                 index === 1 ? animatedStats.cities : 
                 index === 2 ? animatedStats.clients : 
                 animatedStats.projects}
                {stat.suffix}
              </div>
              <div className="text-royal-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left Column - Image with overlay */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200" 
                alt="Royal Group of Real Estate Headquarters" 
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-royal-900/40 to-royal-900/10 rounded-lg"></div>
            </div>
            
            {/* Floating CEO Quote */}
            <div className="absolute -bottom-10 -right-10 lg:bottom-10 lg:right-[-80px] bg-white p-6 rounded-lg shadow-xl max-w-xs animate-fade-up animate-delay-500 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
              <div className="relative">
                <svg> className="absolute top-0 left-0 w-12 h-12 text-gold-200 transform -translate-x-6 -translate-y-6" 
                  fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-royal-800 text-sm leading-relaxed">
                  "Our mission is to transform the real estate landscape by delivering exceptional properties that enrich lives and communities."
                </p>
                <div className="mt-4 flex items-center border-t border-gray-100 pt-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-royal-100 border-2 border-gold-200">
                    <img 
                      src="https://iili.io/3FQ3Tzl.jpg" 
                      alt="CEO" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-royal-800 font-medium">Basit Mashkor Wani</p>
                    <p className="text-royal-600 text-sm">CEO, Royal Group</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Tabbed Content */}
          <div>
            <Tabs defaultValue="vision" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="vision" className="text-sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Vision & Mission
                </TabsTrigger>
                <TabsTrigger value="achievements" className="text-sm">
                  <Award className="w-4 h-4 mr-2" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="team" className="text-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Our Team
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="vision" className="animate-fade-up">
                <h3 className="text-xl font-bold text-royal-800 mb-4">Our Vision & Mission</h3>
                <p className="text-royal-600 mb-6">
                  At Royal Group, we envision a future where exceptional real estate transforms lives and communities. Our mission is to create spaces that inspire, endure, and appreciate in value while maintaining the highest standards of quality and customer satisfaction.
                </p>
                <p className="text-royal-600 mb-6">
                  We are committed to sustainable development practices, innovative design, and creating properties that stand the test of time. Our approach combines luxury with functionality, tradition with innovation, and aesthetics with practicality.
                </p>
                <CustomButton variant="primary">
                  Our Philosophy
                </CustomButton>
              </TabsContent>
              
              <TabsContent value="achievements" className="animate-fade-up">
                <h3 className="text-xl font-bold text-royal-800 mb-4">Key Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className="flex items-start p-3 rounded-lg hover:bg-royal-50 transition-colors duration-300"
                    >
                      <CheckCircle size={20} className="text-gold-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-royal-700">{achievement}</span>
                    </div>
                  ))}
                </div>
                <CustomButton 
                  variant="outline" 
                  icon={<Award size={18} />} 
                  iconPosition="left"
                >
                  View Awards
                </CustomButton>
              </TabsContent>
              
              <TabsContent value="team" className="animate-fade-up">
                <h3 className="text-xl font-bold text-royal-800 mb-4">Our Leadership Team</h3>
                <p className="text-royal-600 mb-6">
                  Our success is driven by a team of passionate professionals with decades of combined experience in real estate development, architecture, finance, and customer service.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { name: "Basit Mashkor", role: "CEO", image: "https://iili.io/3FQ3Tzl.jpg" },
                    { name: "QAYOOM BOBJI", role: "COO", image: "" },
                    { name: "WALI TERTH", role: "CFO", image: "" }
                  ].map((member, index) => (
                    <div key={index} className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 border-2 border-gold-200">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-medium text-royal-800">{member.name}</p>
                      <p className="text-sm text-royal-600">{member.role}</p>
                    </div>
                  ))}
                </div>
                <CustomButton 
                  variant="outline" 
                  icon={<Users size={18} />} 
                  iconPosition="left"
                >
                  Meet The Team
                </CustomButton>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Timeline Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-royal-800 mb-4">Our Journey</h3>
            <p className="text-royal-600 max-w-2xl mx-auto">
              From our humble beginnings to becoming one of India's premier real estate developers, explore the key milestones that have shaped our success story.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-royal-200"></div>
            
            {/* Timeline Items */}
            <div className="relative">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`w-1/2 flex ${index % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8'}`}
                  >
                    <div className="bg-white p-6 rounded-lg shadow-md border border-royal-100 max-w-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="text-gold-500 font-bold mb-2">{milestone.year}</div>
                      <h4 className="text-lg font-semibold text-royal-800 mb-2">{milestone.title}</h4>
                      <p className="text-royal-600 text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Center Point */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gold-500 border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-royal-800 rounded-2xl p-10 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to find your dream property?</h3>
          <p className="text-royal-100 mb-8 max-w-2xl mx-auto">
            Explore our portfolio of premium properties across India's most vibrant cities and discover why Royal Group is the trusted name in real estate.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CustomButton variant="gold">
              Browse Properties
            </CustomButton>
            <CustomButton 
              variant="outline-light" 
              icon={<ArrowUpRight size={18} />} 
              iconPosition="right"
            >
              Contact Us
            </CustomButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

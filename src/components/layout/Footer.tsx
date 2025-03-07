
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ChevronRight, Send } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const quickLinks = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '#about' },
    { name: 'Properties', link: '#featured' },
    { name: 'Services', link: '#services' },
    { name: 'Contact', link: '#contact' }
  ];
  
  const services = [
    { name: 'Residential Properties', link: '#' },
    { name: 'Commercial Properties', link: '#' },
    { name: 'Property Management', link: '#' },
    { name: 'Investment Advisory', link: '#' },
    { name: 'Legal Assistance', link: '#' }
  ];
  
  const cities = [
    { name: 'Srinagar', link: '#' },
    { name: 'Jammu', link: '#' },
    { name: 'Chandigarh', link: '#' },
    { name: 'Delhi', link: '#' },
    { name: 'Bangalore', link: '#' }
  ];
  
  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebookF size={16} />, link: '#' },
    { name: 'Twitter', icon: <FaTwitter size={16} />, link: '#' },
    { name: 'Instagram', icon: <FaInstagram size={16} />, link: '#' },
    { name: 'LinkedIn', icon: <FaLinkedinIn size={16} />, link: '#' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-gradient-to-b from-royal-800 to-royal-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px)] bg-[size:3rem_1px] opacity-10" />
      <motion.div 
        className="container mx-auto section-padding relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="backdrop-blur-sm bg-royal-800/10 p-6 rounded-xl border border-royal-700/20">
            <a href="/" className="flex items-center group">
              <span className="font-display text-2xl font-bold tracking-tight text-white group-hover:text-gold-400 transition-colors duration-300">Royal<span className="text-gold-400 group-hover:text-white">Group</span></span>
            </a>
            <p className="mt-4 text-royal-200">
              Premium real estate solutions across India's major cities. Building excellence in real estate since 2008.
            </p>
            <div className="mt-8 space-y-4">
              <motion.div whileHover={{ x: 5 }} className="flex items-center group cursor-pointer">
                <Mail className="w-5 h-5 mr-3 text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
                <a href="mailto:info@royalgroupofrealestates.com" className="text-royal-200 group-hover:text-white transition-colors duration-300">
                  info@royalgroupofrealestates.com
                </a>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-center group cursor-pointer">
                <Phone className="w-5 h-5 mr-3 text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
                <a href="tel:+917006064587" className="text-royal-200 group-hover:text-white transition-colors duration-300">
                  +91 700-606-4587
                </a>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="flex items-start group cursor-pointer">
                <MapPin className="w-5 h-5 mr-3 text-gold-400 group-hover:text-gold-300 transition-colors duration-300 mt-1" />
                <span className="text-royal-200 group-hover:text-white transition-colors duration-300">
                  Residency Road, Srinagar, Jammu and Kashmir, India
                </span>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants} className="backdrop-blur-sm bg-royal-800/10 p-6 rounded-xl border border-royal-700/20">
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a 
                    href={link.link} 
                    className="text-royal-200 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-gold-400 group-hover:text-gold-300 transition-transform duration-300 group-hover:translate-x-1" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold mt-8 mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a 
                    href={service.link} 
                    className="text-royal-200 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-gold-400 group-hover:text-gold-300 transition-transform duration-300 group-hover:translate-x-1" />
                    {service.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Cities */}
          <motion.div variants={itemVariants} className="backdrop-blur-sm bg-royal-800/10 p-6 rounded-xl border border-royal-700/20">
            <h3 className="text-lg font-semibold mb-6 text-white">Our Cities</h3>
            <ul className="space-y-3">
              {cities.map((city, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a 
                    href={city.link} 
                    className="text-royal-200 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-gold-400 group-hover:text-gold-300 transition-transform duration-300 group-hover:translate-x-1" />
                    {city.name}
                  </a>
                </motion.li>
              ))}
            </ul>
            
            <h3 className="text-lg font-semibold mt-8 mb-6 text-white">Working Hours</h3>
            <div className="text-royal-200">
              <p className="mb-2">Monday - Saturday</p>
              <p className="font-semibold text-white">9:00 AM - 6:00 PM</p>
            </div>
          </motion.div>
          
          {/* Newsletter */}
          <motion.div variants={itemVariants} className="backdrop-blur-sm bg-royal-800/10 p-6 rounded-xl border border-royal-700/20">
            <h3 className="text-lg font-semibold mb-6 text-white">Newsletter</h3>
            <p className="text-royal-200 mb-4">
              Subscribe to our newsletter for the latest updates on properties and market insights.
            </p>
            <form className="mt-4 group">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-3 rounded-lg bg-royal-700/50 border border-royal-600 text-white placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-300"
                />
                <motion.button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold-500 text-white p-2 rounded-md hover:bg-gold-600 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </form>
            
            <h3 className="text-lg font-semibold mt-8 mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index} 
                  href={social.link} 
                  className="w-10 h-10 rounded-lg bg-royal-700/50 border border-royal-600 flex items-center justify-center hover:bg-gold-500 hover:border-gold-600 transition-all duration-300 text-white group"
                  aria-label={social.name}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="border-t border-royal-700/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <motion.div 
            className="flex flex-col md:flex-row items-center md:items-start"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center">
              <span className="text-gold-400 font-medium mr-1.5">&copy;</span>
              <span className="text-royal-200 font-light tracking-wide">{currentYear}</span>
              <span className="mx-1.5 text-gold-500/50">|</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-royal-100 to-gold-300 font-medium">Royal Group of Real Estates</span>
            </div>
            <div className="flex items-center mt-1 md:mt-0 md:ml-1.5">
              <span className="text-royal-300/80 text-xs font-light tracking-wider">All rights reserved</span>
              <span className="mx-1.5 text-gold-500/30 hidden md:inline">•</span>
              <span className="text-royal-300/80 text-xs font-light tracking-wider hidden md:inline">Designed by</span>
              <span className="text-royal-200/90 text-xs font-medium ml-1 hidden md:inline hover:text-gold-300 transition-colors duration-300 cursor-pointer">Mussadiq Wani</span>
            </div>
            <span className="text-royal-300/80 text-xs font-light tracking-wider md:hidden mt-1">Designed by <span className="text-royal-200/90 font-medium hover:text-gold-300 transition-colors duration-300 cursor-pointer">Mussadiq Wani</span></span>
          </motion.div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <motion.a whileHover={{ y: -2 }} href="#" className="text-royal-300 hover:text-white text-sm transition-colors duration-300">Privacy Policy</motion.a>
            <motion.a whileHover={{ y: -2 }} href="#" className="text-royal-300 hover:text-white text-sm transition-colors duration-300">Terms of Service</motion.a>
            <motion.a whileHover={{ y: -2 }} href="#" className="text-royal-300 hover:text-white text-sm transition-colors duration-300">Cookie Policy</motion.a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;

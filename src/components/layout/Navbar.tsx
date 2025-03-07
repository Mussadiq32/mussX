
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, LogIn, UserCircle, BarChart2, Tool, Newspaper } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import CustomButton from '../ui/CustomButton';
import { cn } from '@/lib/utils';
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', link: '/' },
    { 
      name: 'Properties', 
      link: '#',
      dropdown: [
        { name: 'Residential', link: '#residential' },
        { name: 'Commercial', link: '#commercial' },
        { name: 'Featured', link: '#featured' },
      ]
    },
    { name: 'About Us', link: '#about' },
    { name: 'Services', link: '#services' },
    { name: 'Contact', link: '#contact' },
    {
      name: 'Tools',
      link: '#',
      dropdown: [
        { 
          name: 'Property Rates & Trends', 
          link: 'https://www.99acres.com/property-rates-and-price-trends-prffid',
          icon: <BarChart2 size={16} className="mr-2 text-gold-500" />
        },
        { 
          name: 'Property News', 
          link: 'https://www.99acres.com/real-estate-insights-irffid?referrer_section=SIDE_MENU',
          icon: <Newspaper size={16} className="mr-2 text-gold-500" />
        },
      ]
    },
  ];

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12 lg:px-24',
        scrolled ? 'py-3 navbar-blur shadow-lg' : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="https://iili.io/2mPx3rP.png" alt="Royal Group of Real Estates Logo" className="h-10 mr-2" />
          <span className="font-display text-xl font-bold tracking-tight text-royal-800 hidden sm:block">Royal<span className="text-gold-500">Group</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1 items-center">
          <ThemeToggle className="mr-2" />
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.dropdown ? (
                <>
                  <button 
                    onClick={() => toggleDropdown(item.name)}
                    className="px-3 py-2 text-royal-800 hover:text-gold-600 flex items-center transition-colors duration-300"
                  >
                    {item.name}
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  <div className={cn(
                    "absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out transform origin-top-left",
                    activeDropdown === item.name ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  )}>
                    <div className="py-1">
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.link}
                          className="block px-4 py-2 text-sm text-royal-700 hover:bg-royal-50 hover:text-gold-600"
                          onClick={closeMenu}
                        >
                          {dropdownItem.icon && dropdownItem.icon}
                          {dropdownItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href={item.link}
                  className="px-3 py-2 text-royal-800 hover:text-gold-600 transition-colors duration-300"
                  onClick={closeMenu}
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
          
          {isAuthenticated ? (
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('user')}
                className="px-3 py-2 text-royal-800 hover:text-gold-600 flex items-center transition-colors duration-300"
              >
                <UserCircle size={20} className="mr-1" />
                {user?.name || 'Account'}
                <ChevronDown size={16} className="ml-1" />
              </button>
              <div className={cn(
                "absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out transform origin-top-right",
                activeDropdown === 'user' ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
              )}>
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-royal-700 hover:bg-royal-50 hover:text-gold-600"
                    onClick={() => {
                      closeMenu();
                      setActiveDropdown(null);
                    }}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/favorites"
                    className="block px-4 py-2 text-sm text-royal-700 hover:bg-royal-50 hover:text-gold-600"
                    onClick={() => {
                      closeMenu();
                      setActiveDropdown(null);
                    }}
                  >
                    Favorites
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      closeMenu();
                      setActiveDropdown(null);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-royal-700 hover:bg-royal-50 hover:text-gold-600"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/auth">
              <CustomButton variant="primary" size="sm" className="ml-4" icon={<LogIn size={18} />}>
                Sign In
              </CustomButton>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-royal-800 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out pt-24 px-6 overflow-y-auto",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.dropdown ? (
                <div className="space-y-2">
                  <button 
                    onClick={() => toggleDropdown(item.name)}
                    className="w-full flex justify-between items-center py-2 text-royal-800 font-medium"
                  >
                    {item.name}
                    <ChevronDown size={16} className={cn(
                      "transition-transform duration-200",
                      activeDropdown === item.name ? "transform rotate-180" : ""
                    )} />
                  </button>
                  <div className={cn(
                    "transition-all duration-300 ease-in-out space-y-1 ml-4",
                    activeDropdown === item.name ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  )}>
                    {item.dropdown.map((dropdownItem) => (
                      <a
                        key={dropdownItem.name}
                        href={dropdownItem.link}
                        className="block py-2 text-royal-700 hover:text-gold-600 flex items-center"
                        onClick={closeMenu}
                      >
                        {dropdownItem.icon && dropdownItem.icon}
                        {dropdownItem.name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  href={item.link}
                  className="block py-2 text-royal-800 font-medium hover:text-gold-600"
                  onClick={closeMenu}
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
          
          {isAuthenticated ? (
            <div className="space-y-2">
              <button 
                onClick={() => toggleDropdown('mobileUser')}
                className="w-full flex justify-between items-center py-2 text-royal-800 font-medium"
              >
                <div className="flex items-center">
                  <UserCircle size={20} className="mr-2" />
                  {user?.name || 'Account'}
                </div>
                <ChevronDown size={16} className={cn(
                  "transition-transform duration-200",
                  activeDropdown === 'mobileUser' ? "transform rotate-180" : ""
                )} />
              </button>
              <div className={cn(
                "transition-all duration-300 ease-in-out space-y-1 ml-4",
                activeDropdown === 'mobileUser' ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
              )}>
                <Link
                  to="/profile"
                  className="block py-2 text-royal-700 hover:text-gold-600"
                  onClick={closeMenu}
                >
                  My Profile
                </Link>
                <Link
                  to="/favorites"
                  className="block py-2 text-royal-700 hover:text-gold-600"
                  onClick={closeMenu}
                >
                  Favorites
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    closeMenu();
                  }}
                  className="block w-full text-left py-2 text-royal-700 hover:text-gold-600"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/auth"
              className="block py-2 text-royal-800 font-medium hover:text-gold-600"
              onClick={closeMenu}
            >
              Sign In / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

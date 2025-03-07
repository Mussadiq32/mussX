
import { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import CustomButton from '../ui/CustomButton';
import { cn } from '@/lib/utils';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    city: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [floatingLabels, setFloatingLabels] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
    city: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      // You would typically handle the response here
      alert('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        city: ''
      });
    }, 1500);
  };
  
  const contactInfo = [
    {
      icon: <Phone size={20} className="text-gold-500" />,
      title: 'Call Us',
      content: '+91 700-606-4587',
      link: 'tel:+917006064587'
    },
    {
      icon: <Mail size={20} className="text-gold-500" />,
      title: 'Email Us',
      content:'info@royalgroupofrealestates.com',
      link:'info@royalgroupofrealestates.com'
    },
    {
      icon: <MapPin size={20} className="text-gold-500" />,
      title: 'Visit Us',
      content: 'Residency Road, Srinagar, J&K, India',
      link: 'https://maps.google.com'
    }
  ];

  return (
    <section id="contact" className="section-padding bg-royal-50/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Form */}
          <div className="animate-fade-right backdrop-blur-sm bg-white/50 p-8 rounded-2xl shadow-lg border border-royal-100/20">
            <div className="inline-block px-3 py-1 bg-gold-100 text-gold-600 text-sm font-medium rounded-full mb-4 transform hover:scale-105 transition-transform duration-300">
              Contact Us
            </div>
            <h2 className="heading-lg text-royal-800 mb-6">
              Get In <span className="text-gradient animate-pulse">Touch</span> With Us
            </h2>
            <p className="text-royal-600 mb-8">
              Have questions about our properties or services? Fill out the form below and our team will get back to you promptly.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-royal-700 mb-2">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => {
                        setFocusedInput('name');
                        setFloatingLabels(prev => ({ ...prev, name: true }));
                      }}
                      onBlur={(e) => {
                        setFocusedInput(null);
                        setFloatingLabels(prev => ({ ...prev, name: e.target.value !== '' }));
                      }}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border transition-all duration-300 bg-white",
                        focusedInput === 'name'
                          ? 'border-gold-400 ring-2 ring-gold-200 ring-opacity-50 shadow-sm'
                          : 'border-gray-200 hover:border-gold-300',
                        floatingLabels.name && 'pt-6'
                      )}
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="name"
                      className={cn(
                        "absolute left-4 transition-all duration-200 pointer-events-none text-royal-600",
                        floatingLabels.name
                          ? 'transform -translate-y-3 scale-75 top-2'
                          : 'top-3'
                      )}
                    >
                      Full Name
                    </label>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-royal-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border transition-all duration-300",
                      focusedInput === 'email'
                        ? 'border-gold-400 ring-2 ring-gold-200 ring-opacity-50 shadow-sm'
                        : 'border-gray-200 hover:border-gold-300'
                    )}
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-royal-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border transition-all duration-300",
                      focusedInput === 'phone'
                        ? 'border-gold-400 ring-2 ring-gold-200 ring-opacity-50 shadow-sm'
                        : 'border-gray-200 hover:border-gold-300'
                    )}
                    onFocus={() => setFocusedInput('phone')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="+91 7006064587"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-royal-700 mb-2">City of Interest</label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border transition-all duration-300",
                      focusedInput === 'city'
                        ? 'border-gold-400 ring-2 ring-gold-200 ring-opacity-50 shadow-sm'
                        : 'border-gray-200 hover:border-gold-300'
                    )}
                    onFocus={() => setFocusedInput('city')}
                    onBlur={() => setFocusedInput(null)}
                  >
                    <option value="">Select a City</option>
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
              
              <div>
                <label htmlFor="message" className="block text-royal-700 mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border transition-all duration-300",
                    focusedInput === 'message'
                      ? 'border-gold-400 ring-2 ring-gold-200 ring-opacity-50 shadow-sm'
                      : 'border-gray-200 hover:border-gold-300'
                  )}
                  onFocus={() => setFocusedInput('message')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Tell us about your requirements..."
                  required
                ></textarea>
              </div>
              
              <CustomButton
                type="submit"
                className="w-full md:w-auto"
                icon={<Send size={18} />}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </CustomButton>
            </form>
          </div>
          
          {/* Right Column - Map and Contact Info */}
          <div className="animate-fade-left space-y-8">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-royal-100/20 h-[350px] lg:h-[400px] animate-fade-up transform hover:scale-[1.02] transition-all duration-500">
              {/* Replace with an actual map component if available */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13241.744366452256!2d74.79548121462833!3d34.072927011539736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18f7ae12c1c7d%3A0x50d2a1d09a0c0a7c!2sResidency%20Rd%2C%20Srinagar!5e0!3m2!1sen!2sin!4v1714406271694!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Royal Group of Real Estate location"
              ></iframe>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((info, index) => (
                <a 
                  key={index} 
                  href={info.link} 
                  className={cn(
                    "group bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-royal-100/20 shadow-lg",
                    "hover:shadow-2xl hover:border-gold-200 hover:-translate-y-1",
                    "transition-all duration-500 block text-center animate-fade-up"
                  )}
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-gold-100 transition-all duration-300">
                    {info.icon}
                  </div>
                  <h3 className="text-royal-800 font-semibold mb-1 group-hover:text-gold-600 transition-colors duration-300">{info.title}</h3>
                  <p className="text-royal-600 group-hover:text-royal-700 transition-colors duration-300">{info.content}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

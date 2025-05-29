import React, { useState, useEffect } from 'react';
import { Newspaper, BellRing, Menu, X, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitFormOpen, setIsSubmitFormOpen] = useState(false);
  
  // Handle scroll events to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const toggleSubmitForm = () => {
    setIsSubmitFormOpen(!isSubmitFormOpen);
  };
  
  // Animation variants
  const headerVariants = {
    initial: { y: -100 },
    animate: { y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
  };
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
      variants={headerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Newspaper className="text-blue-600 h-8 w-8 mr-2" />
            <span className="font-bold text-xl md:text-2xl text-gray-900">
              Truth<span className="text-blue-600">Pulse</span>
            </span>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#verified" className="text-gray-700 hover:text-blue-600 font-medium">
              Verified News
            </a>
            <a href="#trending" className="text-gray-700 hover:text-blue-600 font-medium">
              Trending & Unverified
            </a>
            <button 
              onClick={toggleSubmitForm}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Send size={16} className="mr-1" />
              Submit Content
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-4 px-4">
              <a 
                href="#verified" 
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Verified News
              </a>
              <a 
                href="#trending" 
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Trending & Unverified
              </a>
              <button 
                onClick={() => {
                  toggleSubmitForm();
                  setIsMobileMenuOpen(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                <Send size={16} className="mr-1" />
                Submit Content
              </button>
            </nav>
          </div>
        )}
      </div>
      
      {/* Submit form dialog */}
      {isSubmitFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Submit Content for Verification</h3>
                <button 
                  onClick={toggleSubmitForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">
                Help us combat misinformation by submitting suspicious content you've encountered for verification.
              </p>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                    Content URL (optional)
                  </label>
                  <input 
                    type="url" 
                    id="url" 
                    placeholder="https://example.com/suspicious-article"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea 
                    id="description" 
                    rows={4}
                    placeholder="Please describe the content you're submitting and why you think it needs verification..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Topics
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Politics', 'Health', 'Economy', 'Technology', 'COVID-19'].map(topic => (
                      <label key={topic} className="inline-flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="ml-2 text-sm text-gray-700">{topic}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Send size={16} className="mr-2" />
                    Submit for Verification
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </motion.header>
  );
};

export default Header;
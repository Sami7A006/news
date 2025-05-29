import React from 'react';
import { Newspaper, Twitter, Facebook, Instagram, Mail, GithubIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Newspaper className="text-blue-500 h-6 w-6 mr-2" />
              <span className="font-bold text-xl">
                Truth<span className="text-blue-500">Pulse</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Dedicated to combating misinformation in India through real-time fact-checking and verification.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                <GithubIcon size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#verified" className="text-gray-400 hover:text-blue-500 transition-colors">Verified News</a></li>
              <li><a href="#trending" className="text-gray-400 hover:text-blue-500 transition-colors">Trending Content</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Submit Content</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Weekly Summary</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Fact-Checking Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Identifying Fake News</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">Research Papers</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="text-gray-400 mr-2" />
                <a href="mailto:info@truthpulse.org" className="text-gray-400 hover:text-blue-500 transition-colors">info@truthpulse.org</a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium text-sm text-gray-400 mb-2">Subscribe to Our Newsletter</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} TruthPulse. All rights reserved. Built with the commitment to factual reporting.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
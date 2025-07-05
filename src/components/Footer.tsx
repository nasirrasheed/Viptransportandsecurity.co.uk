import React from 'react';
import { Crown, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-yellow-400" />
              <div>
                <div className="font-playfair text-xl font-bold">VIP Transport</div>
                <div className="text-yellow-400 text-sm font-montserrat">& Security</div>
              </div>
            </div>
            <p className="text-gray-400 font-montserrat mb-4 max-w-md">
              Premium chauffeur services for weddings, events, and VIP travel. Trusted by 5-star hotels with luxury fleet including Rolls Royce, Bentley, and Mercedes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 font-montserrat">
              <li><a href="/" className="text-gray-400 hover:text-yellow-400 transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">About</a></li>
              <li><a href="/fleet" className="text-gray-400 hover:text-yellow-400 transition-colors">Fleet</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-yellow-400 transition-colors">Services</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-yellow-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 font-montserrat">
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone size={16} />
                <span>+44 7123 456 789</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail size={16} />
                <span>info@viptransport.co.uk</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin size={16} />
                <span>London, United Kingdom</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center font-montserrat text-gray-400">
          <p>&copy; 2024 VIP Transport & Security. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
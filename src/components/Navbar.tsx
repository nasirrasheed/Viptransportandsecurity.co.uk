import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Crown } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/fleet', label: 'Fleet' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Crown className="h-8 w-8 text-yellow-400" />
            <div className="text-white">
              <div className="font-playfair text-xl font-bold">VIP Transport</div>
              <div className="text-yellow-400 text-sm font-montserrat">& Security</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-montserrat text-sm font-medium transition-all duration-300 hover:text-yellow-400 ${
                  location.pathname === item.path ? 'text-yellow-400' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://wa.me/447123456789"
              className="bg-yellow-400 text-black px-6 py-2 rounded-full font-montserrat font-medium text-sm hover:bg-yellow-300 transition-colors duration-300"
            >
              Book Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-yellow-400 bg-gray-900'
                    : 'text-white hover:text-yellow-400 hover:bg-gray-900'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-3 py-2">
              <a
                href="https://wa.me/447123456789"
                className="block text-center bg-yellow-400 text-black px-6 py-2 rounded-full font-montserrat font-medium text-sm hover:bg-yellow-300 transition-colors duration-300"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
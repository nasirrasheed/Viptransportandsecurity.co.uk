import React, { useState, useEffect } from 'react';
import { Users, Settings, MessageCircle } from 'lucide-react';
import { getFleetVehicles, type FleetVehicle } from '../lib/supabase';

const Fleet: React.FC = () => {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const data = await getFleetVehicles();
      setVehicles(data);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(vehicles.map(v => v.category)))];
  
  const filteredVehicles = selectedCategory === 'All' 
    ? vehicles 
    : vehicles.filter(vehicle => vehicle.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              Our Luxury Fleet
            </h1>
            <p className="font-montserrat text-xl text-gray-200 max-w-3xl mx-auto">
              Choose from our collection of premium vehicles, each maintained to the highest standards 
              and perfect for your special occasion.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-montserrat font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-yellow-400 text-black'
                    : 'bg-transparent border border-gray-600 text-gray-300 hover:border-yellow-400 hover:text-yellow-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-montserrat text-gray-400 text-lg">No vehicles found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-xl">
                  <div className="relative">
                    <img 
                      src={vehicle.image_url} 
                      alt={vehicle.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-montserrat font-medium">
                        {vehicle.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-playfair text-2xl font-semibold mb-2">{vehicle.name}</h3>
                    <p className="font-montserrat text-gray-400 mb-4">{vehicle.description}</p>
                    
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Users size={16} />
                        <span>{vehicle.passengers} passengers</span>
                      </div>
                    </div>

                    {vehicle.features && vehicle.features.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-montserrat font-semibold mb-2">Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {vehicle.features.slice(0, 4).map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-gray-400">
                              <Settings size={12} />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {vehicle.occasions && vehicle.occasions.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-montserrat font-semibold mb-2">Perfect for:</h4>
                        <div className="flex flex-wrap gap-2">
                          {vehicle.occasions.map((occasion, index) => (
                            <span key={index} className="bg-black text-yellow-400 px-3 py-1 rounded-full text-sm font-montserrat">
                              {occasion}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                      <div className="font-montserrat text-yellow-400 font-semibold">
                        {vehicle.price}
                      </div>
                      <a
                        href={`https://wa.me/447123456789?text=I'm interested in booking the ${vehicle.name}`}
                        className="bg-yellow-400 text-black px-4 py-2 rounded-full font-montserrat font-medium hover:bg-yellow-300 transition-colors flex items-center space-x-2"
                      >
                        <MessageCircle size={16} />
                        <span>Book Now</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-semibold mb-6">Can't Find What You're Looking For?</h2>
          <p className="font-montserrat text-gray-400 mb-8 text-lg">
            We have additional vehicles available for special requests. Contact us to discuss your specific needs.
          </p>
          <a
            href="https://wa.me/447123456789"
            className="bg-yellow-400 text-black px-8 py-4 rounded-full font-montserrat font-medium hover:bg-yellow-300 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <MessageCircle size={20} />
            <span>Contact Us</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Fleet;
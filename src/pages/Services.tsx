import React, { useState, useEffect } from 'react';
import { Heart, Plane, Briefcase, Star, Clock, Shield, MessageCircle, Car, Users } from 'lucide-react';
import { getServices, type Service } from '../lib/supabase';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      Heart: <Heart className="h-12 w-12 text-yellow-400" />,
      Plane: <Plane className="h-12 w-12 text-yellow-400" />,
      Briefcase: <Briefcase className="h-12 w-12 text-yellow-400" />,
      Star: <Star className="h-12 w-12 text-yellow-400" />,
      Car: <Car className="h-12 w-12 text-yellow-400" />,
      Shield: <Shield className="h-12 w-12 text-yellow-400" />,
      Clock: <Clock className="h-12 w-12 text-yellow-400" />,
      Users: <Users className="h-12 w-12 text-yellow-400" />,
    };
    return icons[iconName] || <Star className="h-12 w-12 text-yellow-400" />;
  };

  const additionalServices = [
    {
      icon: <Clock className="h-8 w-8 text-yellow-400" />,
      title: '24/7 Service',
      description: 'Round-the-clock availability for your convenience'
    },
    {
      icon: <Shield className="h-8 w-8 text-yellow-400" />,
      title: 'Fully Insured',
      description: 'Complete insurance coverage for your peace of mind'
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-yellow-400" />,
      title: 'WhatsApp Booking',
      description: 'Instant booking and communication via WhatsApp'
    }
  ];

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
            backgroundImage: 'url(https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="font-montserrat text-xl text-gray-200 max-w-3xl mx-auto">
              Professional chauffeur services tailored to your needs, from weddings to corporate events.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-montserrat text-gray-400 text-lg">No services available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-20">
              {services.map((service, index) => (
                <div key={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="mb-6">{getIcon(service.icon_name)}</div>
                    <h2 className="font-playfair text-3xl font-semibold mb-4">{service.title}</h2>
                    <p className="font-montserrat text-gray-400 text-lg mb-6">{service.description}</p>
                    
                    {service.features && service.features.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-montserrat font-semibold mb-3">Service Features:</h3>
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center space-x-2 font-montserrat text-gray-400">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {service.vehicles && service.vehicles.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-montserrat font-semibold mb-3">Available Vehicles:</h3>
                        <div className="flex flex-wrap gap-2">
                          {service.vehicles.map((vehicle, i) => (
                            <span key={i} className="bg-gray-800 text-yellow-400 px-3 py-1 rounded-full text-sm font-montserrat">
                              {vehicle}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="font-montserrat text-yellow-400 font-semibold text-lg">
                        {service.price}
                      </div>
                      <a
                        href={`https://wa.me/447123456789?text=I'm interested in ${service.title} service`}
                        className="bg-yellow-400 text-black px-6 py-3 rounded-full font-montserrat font-medium hover:bg-yellow-300 transition-colors flex items-center space-x-2"
                      >
                        <MessageCircle size={20} />
                        <span>Book Now</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <img 
                      src={service.image_url} 
                      alt={service.title}
                      className="rounded-lg shadow-2xl w-full h-96 object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-semibold mb-4">Why Choose Our Services</h2>
            <p className="font-montserrat text-gray-400 max-w-2xl mx-auto">
              Additional benefits that make us the preferred choice for luxury transport
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((item, index) => (
              <div key={index} className="bg-black p-8 rounded-lg text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="font-playfair text-xl font-semibold mb-3">{item.title}</h3>
                <p className="font-montserrat text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-semibold mb-4">How to Book</h2>
            <p className="font-montserrat text-gray-400 max-w-2xl mx-auto">
              Simple steps to secure your luxury transport
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: '1', 
                title: 'Contact Us', 
                description: 'WhatsApp us with your requirements and preferred service' 
              },
              { 
                step: '2', 
                title: 'Get Quote', 
                description: 'Receive instant pricing and vehicle availability' 
              },
              { 
                step: '3', 
                title: 'Confirm Booking', 
                description: 'Secure your booking with confirmation and payment' 
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-yellow-400 text-black w-16 h-16 rounded-full flex items-center justify-center font-playfair text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-playfair text-xl font-semibold mb-2">{item.title}</h3>
                <p className="font-montserrat text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-semibold mb-6">Ready to Book Your Service?</h2>
          <p className="font-montserrat text-gray-400 mb-8 text-lg">
            Contact us via WhatsApp for instant quotes and booking confirmation
          </p>
          <a
            href="https://wa.me/447123456789"
            className="bg-yellow-400 text-black px-8 py-4 rounded-full font-montserrat font-medium hover:bg-yellow-300 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <MessageCircle size={20} />
            <span>Start Booking Process</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
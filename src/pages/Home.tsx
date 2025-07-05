import React from 'react';
import { ArrowRight, Star, Shield, Car, Clock, MessageCircle } from 'lucide-react';

const Home: React.FC = () => {
  const services = [
    {
      title: 'Wedding Chauffeur',
      description: 'Elegant transport for your special day with Rolls Royce and Bentley options',
      icon: <Car className="h-8 w-8 text-yellow-400" />
    },
    {
      title: 'VIP Airport Transfers',
      description: 'Professional meet and greet service with luxury vehicles',
      icon: <Shield className="h-8 w-8 text-yellow-400" />
    },
    {
      title: 'Corporate Travel',
      description: 'Executive transport for business meetings and events',
      icon: <Clock className="h-8 w-8 text-yellow-400" />
    },
    {
      title: 'Private Events',
      description: 'Luxury transport for special occasions and celebrations',
      icon: <Star className="h-8 w-8 text-yellow-400" />
    }
  ];

  const fleet = [
    {
      name: 'Rolls Royce Ghost',
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
      occasions: ['Weddings', 'VIP Events']
    },
    {
      name: 'Bentley Mulsanne',
      image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800',
      occasions: ['Corporate', 'Weddings']
    },
    {
      name: 'Mercedes S-Class',
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
      occasions: ['Airport', 'Corporate']
    },
    {
      name: 'Ferrari California',
      image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=800',
      occasions: ['Special Events', 'Prom']
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      review: 'Booked a Bentley for our wedding - absolutely flawless service. The chauffeur was professional and the car was pristine.',
      rating: 5,
      event: 'Wedding'
    },
    {
      name: 'Michael Chen',
      review: 'VIP Transport provided excellent service for our corporate event. Highly recommend for business travel.',
      rating: 5,
      event: 'Corporate Event'
    },
    {
      name: 'Emma Williams',
      review: 'Amazing experience from booking to arrival. The Rolls Royce made our anniversary truly special.',
      rating: 5,
      event: 'Anniversary'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-white">
            Luxury Chauffeur Services for
            <span className="text-yellow-400"> Weddings, Events & VIP Travel</span>
          </h1>
          <p className="font-montserrat text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Trusted by 5-Star Hotels. Available for your next celebration or transfer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/fleet"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-montserrat font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>View Our Fleet</span>
              <ArrowRight size={20} />
            </a>
            <a
              href="https://wa.me/447123456789"
              className="bg-green-500 text-white px-8 py-3 rounded-full font-montserrat font-medium hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>Book via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl font-semibold mb-8">Trusted By Leading Hotels</h2>
          <p className="font-montserrat text-gray-400 mb-12">
            Recommended by leading hotels and event planners for seamless luxury transport services.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="text-2xl font-bold text-yellow-400">HILTON</div>
            <div className="text-2xl font-bold text-yellow-400">HYATT</div>
            <div className="text-2xl font-bold text-yellow-400">MARRIOTT</div>
            <div className="text-2xl font-bold text-yellow-400">RITZ</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-semibold mb-4">Our Services</h2>
            <p className="font-montserrat text-gray-400 max-w-2xl mx-auto">
              Professional chauffeur services tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-lg hover:bg-gray-800 transition-all duration-300 hover:transform hover:scale-105">
                <div className="mb-4">{service.icon}</div>
                <h3 className="font-playfair text-xl font-semibold mb-3">{service.title}</h3>
                <p className="font-montserrat text-gray-400 mb-6">{service.description}</p>
                <a
                  href="https://wa.me/447123456789"
                  className="text-yellow-400 font-montserrat font-medium hover:text-yellow-300 transition-colors flex items-center space-x-1"
                >
                  <span>Book Now</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-semibold mb-4">Explore Our Luxury Fleet</h2>
            <p className="font-montserrat text-gray-400 max-w-2xl mx-auto">
              Premium vehicles for every occasion
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fleet.map((car, index) => (
              <div key={index} className="bg-black rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold mb-2">{car.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.occasions.map((occasion, i) => (
                      <span key={i} className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-montserrat">
                        {occasion}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://wa.me/447123456789"
                    className="bg-yellow-400 text-black px-4 py-2 rounded-full font-montserrat font-medium hover:bg-yellow-300 transition-colors w-full block text-center"
                  >
                    Request This Car
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-semibold mb-4">How It Works</h2>
            <p className="font-montserrat text-gray-400 max-w-2xl mx-auto">
              Simple steps to book your luxury transport
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Choose Your Car', description: 'Select from our luxury fleet' },
              { step: '2', title: 'Chat on WhatsApp', description: 'Talk to our booking assistant' },
              { step: '3', title: 'Get Confirmation', description: 'Receive instant booking confirmation' },
              { step: '4', title: 'Professional Service', description: 'Chauffeur arrives punctually' }
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-semibold mb-4">What Our Clients Say</h2>
            <p className="font-montserrat text-gray-400 max-w-2xl mx-auto">
              Testimonials from satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-black p-8 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="font-montserrat text-gray-300 mb-4 italic">"{testimonial.review}"</p>
                <div className="border-t border-gray-800 pt-4">
                  <p className="font-montserrat font-semibold">{testimonial.name}</p>
                  <p className="font-montserrat text-sm text-gray-400">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Booking CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-semibold mb-6">Ready to Book Your Luxury Ride?</h2>
          <p className="font-montserrat text-gray-400 mb-8 text-lg">
            Get instant quotes and book your chauffeur service through WhatsApp
          </p>
          <a
            href="https://wa.me/447123456789"
            className="bg-green-500 text-white px-8 py-4 rounded-full font-montserrat font-medium hover:bg-green-600 transition-all duration-300 inline-flex items-center space-x-2 text-lg"
          >
            <MessageCircle size={24} />
            <span>Chat with Booking Assistant Now</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
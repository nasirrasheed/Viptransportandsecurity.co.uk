import React from 'react';
import { Shield, Users, Clock, Award, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-yellow-400" />,
      title: 'Premium Fleet',
      description: 'Luxury vehicles including Rolls Royce, Bentley, and Mercedes-Benz'
    },
    {
      icon: <Users className="h-8 w-8 text-yellow-400" />,
      title: 'Professional Chauffeurs',
      description: 'Experienced, uniformed drivers with extensive background checks'
    },
    {
      icon: <Clock className="h-8 w-8 text-yellow-400" />,
      title: 'Instant WhatsApp Booking',
      description: 'Quick and easy booking process through our WhatsApp assistant'
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-400" />,
      title: 'Trusted Hotel Partnerships',
      description: 'Recommended by leading 5-star hotels across the UK'
    }
  ];

  const stats = [
    { number: '500+', label: 'Happy Clients' },
    { number: '50+', label: 'Luxury Vehicles' },
    { number: '5', label: 'Years Experience' },
    { number: '24/7', label: 'Service Available' }
  ];

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
              Who We Are
            </h1>
            <p className="font-montserrat text-xl text-gray-200 max-w-3xl mx-auto">
              VIP Transport & Security provides luxury chauffeur services tailored for high-profile clients, 
              events, and 5-star hotels across the UK.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-3xl font-semibold mb-6">Our Story</h2>
              <p className="font-montserrat text-gray-400 mb-6 text-lg leading-relaxed">
                Founded with a vision to provide unparalleled luxury transport services, VIP Transport & Security 
                has become the trusted choice for discerning clients across the United Kingdom. Our commitment to 
                excellence, attention to detail, and personalized service has earned us partnerships with leading 
                hotels and event planners.
              </p>
              <p className="font-montserrat text-gray-400 mb-6 text-lg leading-relaxed">
                We understand that every journey is unique, whether it's a wedding day, corporate event, or VIP 
                transfer. Our mission is to deliver seamless, reliable, and elegant transport experiences that 
                exceed expectations and create lasting memories.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-yellow-400" />
                  <span className="font-montserrat text-gray-300">Licensed and fully insured</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-yellow-400" />
                  <span className="font-montserrat text-gray-300">24/7 customer support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-yellow-400" />
                  <span className="font-montserrat text-gray-300">Flexible booking options</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Luxury chauffeur service"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-black p-8 rounded-lg">
                <div className="font-playfair text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                <div className="font-montserrat text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-semibold mb-4">Why Choose Us</h2>
            <p className="font-montserrat text-gray-400 max-w-2xl mx-auto">
              Discover what sets us apart in the luxury transport industry
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-lg text-center hover:bg-gray-800 transition-all duration-300">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="font-playfair text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="font-montserrat text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-semibold mb-4">Our Commitment</h2>
            <p className="font-montserrat text-gray-400 max-w-3xl mx-auto text-lg">
              Every member of our team is dedicated to providing exceptional service. From our professional 
              chauffeurs to our customer service representatives, we ensure that your experience with 
              VIP Transport & Security is nothing short of extraordinary.
            </p>
          </div>
          <div className="bg-black p-8 rounded-lg text-center">
            <blockquote className="font-montserrat text-xl italic text-gray-300 mb-6">
              "We don't just provide transport; we create experiences that reflect the importance of your occasion."
            </blockquote>
            <div className="font-playfair text-yellow-400 font-semibold">
              - Management Team, VIP Transport & Security
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-4xl font-semibold mb-6">Ready to Experience Luxury?</h2>
          <p className="font-montserrat text-gray-400 mb-8 text-lg">
            Contact us today to discuss your transport needs and discover how we can make your journey exceptional.
          </p>
          <a
            href="https://wa.me/447123456789"
            className="bg-yellow-400 text-black px-8 py-4 rounded-full font-montserrat font-medium hover:bg-yellow-300 transition-all duration-300 inline-block"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
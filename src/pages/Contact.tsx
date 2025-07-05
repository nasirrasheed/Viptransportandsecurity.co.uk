import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hello, I'd like to inquire about your services.
    
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Event Date: ${formData.eventDate}
Service: ${formData.service}
Message: ${formData.message}`;
    
    window.open(`https://wa.me/447123456789?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-yellow-400" />,
      title: 'Phone',
      details: '+44 7123 456 789',
      action: 'tel:+447123456789'
    },
    {
      icon: <Mail className="h-6 w-6 text-yellow-400" />,
      title: 'Email',
      details: 'info@viptransport.co.uk',
      action: 'mailto:info@viptransport.co.uk'
    },
    {
      icon: <MapPin className="h-6 w-6 text-yellow-400" />,
      title: 'Location',
      details: 'London, United Kingdom',
      action: '#'
    },
    {
      icon: <Clock className="h-6 w-6 text-yellow-400" />,
      title: 'Availability',
      details: '24/7 Service',
      action: '#'
    }
  ];

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
              Contact Us
            </h1>
            <p className="font-montserrat text-xl text-gray-200 max-w-3xl mx-auto">
              Get in touch for luxury transport bookings, quotes, and inquiries. We're here to help make your journey exceptional.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-gray-900 p-8 rounded-lg text-center hover:bg-gray-800 transition-colors">
                <div className="flex justify-center mb-4">{info.icon}</div>
                <h3 className="font-playfair text-xl font-semibold mb-2">{info.title}</h3>
                <p className="font-montserrat text-gray-400">{info.details}</p>
                {info.action !== '#' && (
                  <a
                    href={info.action}
                    className="inline-block mt-3 text-yellow-400 hover:text-yellow-300 font-montserrat font-medium"
                  >
                    Contact Now
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & WhatsApp */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-playfair text-3xl font-semibold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                    />
                  </div>
                  <div>
                    <label htmlFor="eventDate" className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                    Service Required
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat"
                  >
                    <option value="">Select a service</option>
                    <option value="Wedding Chauffeur">Wedding Chauffeur</option>
                    <option value="VIP Airport Transfer">VIP Airport Transfer</option>
                    <option value="Corporate Travel">Corporate Travel</option>
                    <option value="Private Event">Private Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-montserrat text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-400 text-white font-montserrat resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-montserrat font-medium hover:bg-yellow-300 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>Send via WhatsApp</span>
                </button>
              </form>
            </div>

            {/* WhatsApp Direct */}
            <div>
              <h2 className="font-playfair text-3xl font-semibold mb-6">Instant WhatsApp Booking</h2>
              <div className="bg-black p-8 rounded-lg">
                <div className="text-center mb-6">
                  <MessageCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="font-playfair text-xl font-semibold mb-2">Quick & Easy Booking</h3>
                  <p className="font-montserrat text-gray-400">
                    Get instant quotes and book your luxury transport directly through WhatsApp
                  </p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <span className="font-montserrat text-gray-300">Click the WhatsApp button</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <span className="font-montserrat text-gray-300">Chat with our booking assistant</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <span className="font-montserrat text-gray-300">Receive instant confirmation</span>
                  </div>
                </div>

                <a
                  href="https://wa.me/447123456789?text=Hello, I'd like to inquire about your luxury chauffeur services"
                  className="w-full bg-green-500 text-white px-6 py-4 rounded-lg font-montserrat font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle size={24} />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>

              <div className="mt-8 bg-black p-6 rounded-lg">
                <h3 className="font-playfair text-xl font-semibold mb-4">Business Hours</h3>
                <div className="space-y-2 font-montserrat text-gray-400">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>24/7 Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday:</span>
                    <span>24/7 Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency Service:</span>
                    <span>Always Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-semibold mb-4">Our Service Area</h2>
            <p className="font-montserrat text-gray-400">
              We provide luxury chauffeur services throughout London and the surrounding areas
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-lg text-center">
            <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <p className="font-montserrat text-gray-400">
                  Interactive Map Coming Soon
                </p>
                <p className="font-montserrat text-sm text-gray-500 mt-2">
                  Currently serving London and Home Counties
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat: React.FC = () => {
  return (
    <a
      href="https://wa.me/447123456789?text=Hello, I'd like to book a luxury chauffeur service"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 z-50"
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={24} />
    </a>
  );
};

export default WhatsAppFloat;
"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface ContactButtonsProps {
  whatsappNumber: string;
  emailAddress: string;
  productName?: string;
}

const ContactButtons = ({ whatsappNumber, emailAddress, productName }: ContactButtonsProps) => {
  const handleWhatsApp = () => {
    const message = productName 
      ? `Hi, I have a question about ${productName}`
      : 'Hi, I have a question about your products';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    const subject = productName 
      ? `Inquiry about ${productName}`
      : 'Inquiry from Product Page';
    const url = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;
    window.location.href = url;
  };

  return (
    <div className="flex gap-3">
      <Button 
        variant="outline" 
        className="bg-white hover:bg-green-50 border-green-200"
        onClick={handleWhatsApp}
      >
        <FaWhatsapp className="mr-2 h-4 w-4 text-green-600" />
        WhatsApp
      </Button>
      <Button 
        variant="outline"
        className="bg-white hover:bg-blue-50 border-blue-200"
        onClick={handleEmail}
      >
        <Mail className="mr-2 h-4 w-4" />
        Email
      </Button>
    </div>
  );
};

export default ContactButtons;
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
      ? `Hi, I'm interested in ${productName}. Can you provide the best price?`
      : 'Hi, I\'m interested in your products. Can you provide the best price?';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    const subject = productName 
      ? `Inquiry about ${productName}`
      : 'Inquiry from Website';
    const url = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;
    window.location.href = url;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      {/* WhatsApp 按钮 - 适配深色模式 */}
      <Button 
        className="flex-1 bg-[#25D366] hover:bg-[#20BA5C] text-white dark:bg-[#25D366] dark:hover:bg-[#20BA5C] dark:text-white px-6 py-6 text-base font-semibold"
        onClick={handleWhatsApp}
      >
        <FaWhatsapp className="mr-2 h-5 w-5" />
        WhatsApp
      </Button>
      
      {/* Email 按钮 - 适配深色模式 */}
      <Button 
        variant="outline"
        className="flex-1 border-2 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 px-6 py-6 text-base font-semibold"
        onClick={handleEmail}
      >
        <Mail className="mr-2 h-5 w-5" />
        Email
      </Button>
    </div>
  );
};

export default ContactButtons;
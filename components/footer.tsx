import { APP_NAME } from '@/lib/constants';
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t'>
      <div className='p-5 flex-center'>
         {currentYear} {APP_NAME}. All Rights reserved.&nbsp;&nbsp;<a href="https://eusens.com/6av2124-0mc01-0ax0/" target="_blank">6AV2124-0MC01-0AX0</a>
      </div>
       <div className="flex flex-col items-center gap-2">
          {/* Policy Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/refund-policy" className="hover:text-white">
              Refund Policy
            </Link>
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
          <div className="flex gap-4">
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="w-5 h-5 hover:text-white transition-colors" />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="w-5 h-5 hover:text-white transition-colors" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 hover:text-white transition-colors" />
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="w-5 h-5 hover:text-white transition-colors" />
          </Link>
        </div>
          </div>
    </footer>
  );
};

export default Footer;
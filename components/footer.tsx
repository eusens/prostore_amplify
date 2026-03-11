import { APP_NAME } from '@/lib/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t'>
      <div className='p-5 flex-center'>
         {currentYear} {APP_NAME}. All Rights reserved.&nbsp;by&nbsp;<a href="https://eusens.com" target="_blank">Eusens Technology</a>
      </div>
    </footer>
  );
};

export default Footer;
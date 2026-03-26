import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import Menu from './menu';
import CategoriesDrawer from './categories-drawer';
import Search from './search';

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <CategoriesDrawer />
          <Link href='/' className='flex-start'>
            <Image
              priority={true}
              // src='/images/logo.svg'
              src='/images/logo.png'
              width={58}
              height={58}
              alt={`${APP_NAME} logo`}
            />
            <span className='hidden lg:block font-bold text-2xl ml-3'>
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div className='hidden md:block'>
           <Search />
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
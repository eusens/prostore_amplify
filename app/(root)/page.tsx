import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts,
  getFeaturedProducts,
 } from '@/lib/actions/product.actions';
import ProductCarousel from '@/components/shared/product/product-carousel';
import ViewAllProductsButton from '@/components/view-all-products-button';
import IconBoxes from '@/components/icon-boxes';
import DealCountdown from '@/components/deal-countdown';
import CompanyIntro from '@/components/shared/company-intro'; 

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  return (
  <div>
    {featuredProducts.length > 0 && <ProductCarousel data={featuredProducts} />}

    <CompanyIntro />
    <ProductList title='Newest Arrivals' data={latestProducts} />
    <ViewAllProductsButton />
    <IconBoxes />
    <DealCountdown />
  </div>
);
};

export default HomePage;
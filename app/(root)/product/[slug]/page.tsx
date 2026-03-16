import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductPrice from '@/components/shared/product/product-price';
import { Card, CardContent } from '@/components/ui/card';
import { getProductBySlug } from '@/lib/actions/product.actions';
import { Badge } from '@/components/ui/badge';
import ProductImages from '@/components/shared/product/product-images';
import AddToCart from '@/components/shared/product/add-to-cart';
import { getMyCart } from '@/lib/actions/cart.actions';
import { auth } from '@/auth';
import ReviewList from './review-list';
import ContactBar from '@/components/shared/product/contact-bar';
import IconBoxes from '@/components/icon-boxes';

export const dynamic = 'force-dynamic';

// ========== 动态生成 Metadata ==========
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  // 获取 slug
  const { slug } = await params;
  
  // 获取产品数据
  const product = await getProductBySlug(slug);
  
  // 如果产品不存在，返回默认标题
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist or has been removed.'
    };
  }

  // 使用环境变量
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://www.2000-watt-inverter.com';
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'IAstore';
  
  const productUrl = `${baseUrl}/product/${product.slug}`;

  // 构建产品描述 - 只使用 description 字段
  const description = product.description 
    ? `${product.name} - ${product.description.substring(0, 150)}. Find specifications, pricing, and availability at ${appName}.`
    : `${product.name} - Industrial automation parts and components at ${appName}.`;

  // 构建关键词 - 只使用存在的字段
  const keywords = [
    product.name,
    product.category,
    // product.brand,
    'industrial automation',
    'automation parts',
    'industrial components'
  ].filter(Boolean).join(', ');

  return {
    // 基础 Meta
    title: product.name,  // 只返回 "6AV2 101-0AA04-0AA5"
    description: description,
    keywords: keywords,
    
    // Canonical URL
    alternates: {
      canonical: productUrl,
    },
    
    // Open Graph
    openGraph: {
      title: product.name,
      description: description,
      url: productUrl,
      siteName: appName,
      images: product.images?.length ? [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.name,
        }
      ] : [],
      locale: 'en_US',
      type: 'website',
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: description,
      images: product.images?.length ? [product.images[0]] : [],
    },
    
    // Robots 控制
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // 其他有用的 meta - 只使用存在的字段
    other: {
      'product:brand': product.brand || '',
      'product:category': product.category || '',
      'product:availability': product.stock > 0 ? 'in stock' : 'out of stock',
    },
  };
}

// ========== 页面组件 ==========
const ProductDetailsPage = async (props: {
  params: unknown;
}) => {
  const { slug } = await props.params as { slug: string };

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const session = await auth();
  const userId = session?.user?.id;
  const cart = await getMyCart();

  return (
    <>
    <section>
      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Images */}
        <div className="col-span-2">
          <ProductImages images={product.images!} />
        </div>

        {/* Details */}
        <div className="col-span-2 p-5">
          <div className="flex flex-col gap-6">
            <p>
               {product.category}
            </p>

            <h1 className="h3-bold">{product.name}</h1>

            <p>
              {product.rating} of {product.numReviews} reviews
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ProductPrice
                value={Number(product.price)}
                className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2"
              />
            </div>
          </div>

          <div className="mt-10">
            <p>Description:</p>
            <p>{product.brand}</p>
            <p>{product.description}</p>
          </div>
        </div>

        {/* Action */}
        <div>
          <Card>
            <CardContent className="p-4">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <ProductPrice value={Number(product.price)} />
              </div>

              <div className="mb-2 flex justify-between">
                <div>Status</div>
                {product.stock > 0 ? (
                  <Badge variant="outline">In stock</Badge>
                ) : (
                  <Badge variant="destructive">Unavailable</Badge>
                )}
              </div>

              {product.stock > 0 && (
                  <div className='flex-center'>
                    <AddToCart
                      cart={cart}
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: Number(product.price),
                        qty: 1,
                        image: product.images![0],
                      }}
                    />
                  </div>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
    <div className="mt-8 space-y-4">
      {/* 先放 ContactBar（行动召唤） */}
      <ContactBar productName={product.name} />
      
      {/* 再放 IconBoxes（信任背书） */}
      <IconBoxes />
    </div>
    <section className='mt-10'>
  <h2 className='h2-bold  mb-5'>Customer Reviews</h2>
  <ReviewList
    productId={product.id}
    productSlug={product.slug}
    userId={userId || ''}
  />
</section>
  </>
  );
};

export default ProductDetailsPage;
// email/new-order-notification.tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Tailwind,
} from '@react-email/components';
import React from 'react';

// 1. 使用相对路径导入，而不是 @/ 别名
// import { Order } from '@/types';
// import { formatCurrency } from '@/lib/utils';

// 2. 定义本地类型（避免依赖项目类型）
type OrderItem = {
  productId: string;
  name: string;
  qty: number;
  price: string;
  image?: string;
  slug?: string;
};

type OrderType = {
  id: string;
  isPaid: boolean;
  createdAt: Date | string;
  itemsPrice: string;
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
  orderItems: OrderItem[];
  user?: {
    name: string;
    email: string;
  };
};

type NewOrderNotificationProps = {
  order: OrderType;
  recipients?: string[];
};

// 3. 格式化货币的辅助函数（避免依赖项目工具）
const formatCurrency = (price: string | number) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
  }).format(numPrice);
};

// 4. 格式化日期的辅助函数
const formatDate = (date: Date | string) => {
  const d = new Date(date);
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function NewOrderNotification({ order }: NewOrderNotificationProps) {
  // 5. 安全访问 user 对象
  const userName = order.user?.name || '客户';
  const userEmail = order.user?.email || '未提供邮箱';
  
  return (
    <Html>
      <Preview>新订单通知 - 订单号: {order.id?.slice(-8) || '新订单'}</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='max-w-xl'>
            <Heading className='text-2xl'>🆕 新订单待处理</Heading>
            
            <Section className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4'>
              <Text className='text-yellow-800 font-bold'>
                客户已下单，等待联系确认
              </Text>
              <Text className='text-yellow-700'>
                支付状态: {order.isPaid ? '✅ 已支付' : '⏳ 待支付'}
              </Text>
            </Section>

            <Section>
              <Heading className='text-lg'>👤 客户信息</Heading>
              <Text>姓名: {userName}</Text>
              <Text>邮箱: {userEmail}</Text>
            </Section>

            <Section>
              <Heading className='text-lg'>📦 订单信息</Heading>
              <Text>订单号: {order.id || 'N/A'}</Text>
              <Text>下单时间: {order.createdAt ? formatDate(order.createdAt) : 'N/A'}</Text>
            </Section>

            <Section>
              <Heading className='text-lg'>🛒 商品明细</Heading>
              {order.orderItems && order.orderItems.length > 0 ? (
                order.orderItems.map((item) => (
                  <Row key={item.productId || item.name} className='border-b py-2'>
                    <Column>{item.name}</Column>
                    <Column>x{item.qty || 0}</Column>
                    <Column align='right'>{formatCurrency(item.price || '0')}</Column>
                  </Row>
                ))
              ) : (
                <Text className='text-gray-500'>暂无商品信息</Text>
              )}
            </Section>

            <Section className='mt-4'>
              <Row>
                <Column align='right'>商品总额:</Column>
                <Column align='right' width={100}>{formatCurrency(order.itemsPrice || '0')}</Column>
              </Row>
              <Row>
                <Column align='right'>运费:</Column>
                <Column align='right'>{formatCurrency(order.shippingPrice || '0')}</Column>
              </Row>
              <Row>
                <Column align='right'>税费:</Column>
                <Column align='right'>{formatCurrency(order.taxPrice || '0')}</Column>
              </Row>
              <Row className='font-bold'>
                <Column align='right'>订单总额:</Column>
                <Column align='right'>{formatCurrency(order.totalPrice || '0')}</Column>
              </Row>
            </Section>

            <Section className='mt-6'>
              <Text className='text-center'>
                <a 
                  href={`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}/admin/orders/${order.id}`}
                  className='bg-blue-600 text-white px-4 py-2 rounded no-underline'
                >
                  查看订单详情
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

// 6. 添加预览属性 - 这是 React Email 必需的！
NewOrderNotification.PreviewProps = {
  order: {
    id: 'ORD-20250213-12345678',
    isPaid: false,
    createdAt: new Date('2026-02-13T10:30:00'),
    itemsPrice: '899.00',
    shippingPrice: '10.00',
    taxPrice: '89.90',
    totalPrice: '998.90',
    orderItems: [
      {
        productId: 'prod-001',
        name: '经典款运动鞋',
        qty: 1,
        price: '599.00',
      },
      {
        productId: 'prod-002',
        name: '纯棉T恤',
        qty: 2,
        price: '150.00',
      },
    ],
    user: {
      name: '张三',
      email: 'zhangsan@example.com',
    },
  },
  recipients: ['sales@newsinoenergy.com'],
};
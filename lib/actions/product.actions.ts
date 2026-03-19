'use server';

import { prisma } from '@/lib/prisma';
import { convertToPlainObject } from '../utils';
import { PAGE_SIZE } from '../constants';

// 获取最新产品
export async function getLatestProducts(limit: number = 8) {
  const data = await prisma.product.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}

// 根据 slug 获取单个产品
export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: { slug },
  });

  return product ? convertToPlainObject(product) : null;
}

// 获取所有产品，支持过滤、分页、排序
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  price,
  rating,
  sort,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
  price?: string;
  rating?: string;
  sort?: string;
}) {
  try {
    const queryFilter = query && query !== 'all'
      ? { name: { contains: query, mode: 'insensitive' as const } }
      : {};

    const categoryFilter = category && category !== 'all' ? { category } : {};

    const priceFilter = price && price !== 'all'
      ? {
          price: {
            gte: Number(price.split('-')[0]),
            lte: Number(price.split('-')[1]),
          },
        }
      : {};

    const ratingFilter = rating && rating !== 'all'
      ? { rating: { gte: Number(rating) } }
      : {};

    const whereCondition = {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    };

    const data = await prisma.product.findMany({
      where: whereCondition,
      orderBy:
        sort === 'lowest'
          ? { price: 'asc' }
          : sort === 'highest'
          ? { price: 'desc' }
          : sort === 'rating'
          ? { rating: 'desc' }
          : { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const dataCount = await prisma.product.count({ where: whereCondition });

    return {
      data: convertToPlainObject(data),
      totalPages: Math.ceil(dataCount / limit),
    };
  } catch (error) {
    console.error('获取产品列表失败:', error);
    return { data: [], totalPages: 0 };
  }
}

// 获取特色产品
export async function getFeaturedProducts(limit: number = 4) {
  const data = await prisma.product.findMany({
    where: { isFeatured: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  return convertToPlainObject(data);
}

// 获取所有分类
export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ['category'],
    _count: true,
  });

  return data;
}

export async function getRelatedProducts(
  productId: string,
  category: string,
  limit: number = 4
) {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: category,       // ✅ 同分类
        NOT: { id: productId },   // ✅ 排除自己
      },
      orderBy: {
        createdAt: 'desc',        // 或随机（后面可以优化）
      },
      take: limit,
    });

    return products;
  } catch (error) {
    console.error('获取相关产品失败:', error);
    return [];
  }
}
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';
import { formUrlQuery } from '@/lib/utils';

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};

const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(page);

  const onClick = (btnType: string) => {
    const pageValue = btnType === 'next' ? currentPage + 1 : currentPage - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  // 如果只有一页，不显示分页
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className='flex items-center justify-center gap-4'>
      {/* 上一页按钮 */}
      <Button
        size='lg'
        variant='outline'
        className='w-28'
        onClick={() => onClick('prev')}
        disabled={currentPage <= 1}
      >
        Previous
      </Button>

      {/* 页码信息 - 添加这个！ */}
      <span className='text-sm font-medium px-4 py-2 bg-gray-100 rounded-md'>
        Page {currentPage} of {totalPages}
      </span>

      {/* 下一页按钮 */}
      <Button
        size='lg'
        variant='outline'
        className='w-28'
        onClick={() => onClick('next')}
        disabled={currentPage >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
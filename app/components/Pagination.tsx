'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string; // новий пропс, наприклад '/dashboard/myrecipes'
}

const Pagination = ({ currentPage, totalPages, basePath = '/recipe' }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete('page'); // без ?page=1
    } else {
      params.set('page', page.toString());
    }

    // Формуємо повний URL з basePath і параметрами
    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  const handleClick = (page: number) => {
    router.push(createPageLink(page));
  };

  const pages = [];
  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex gap-2 justify-center mt-8 flex-wrap">
      {currentPage > 1 && (
        <>
          <button className="btn btn-sm" onClick={() => handleClick(1)}>
            « Перша
          </button>
          <button className="btn btn-sm" onClick={() => handleClick(currentPage - 1)}>
            ‹ Назад
          </button>
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-outline'}`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <>
          <button className="btn btn-sm" onClick={() => handleClick(currentPage + 1)}>
            Далі ›
          </button>
          <button className="btn btn-sm" onClick={() => handleClick(totalPages)}>
            Остання »
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;

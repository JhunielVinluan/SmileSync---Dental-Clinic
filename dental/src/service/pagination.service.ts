import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const usePaginationService = (data: any, over = 10) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isPage = searchParams.get('page');
  const pageNumber = Number(isPage);
  const paginationNumber = Math.ceil(data.length / 10);
  const handleSetPage = (newPage: string) => {
    setSearchParams({ page: newPage });
  };

  const changePage = (newPage: number) => {
    if (newPage <= 0) {
      setSearchParams({ page: '1' });
    } else if (newPage > paginationNumber) {
      setSearchParams({ page: paginationNumber.toString() });
    } else {
      setSearchParams({ page: newPage.toString() });
    }
  };

  const start = (pageNumber - 1) * over;
  const end = start + over;

  useEffect(() => {
    if (!isPage) {
      setSearchParams({ page: '1' });
    }
  }, []);

  return {
    changePage,
    handleSetPage,
    pageNumber,
    paginationNumber,
    start,
    end,
  };
};

export default usePaginationService;

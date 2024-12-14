import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import usePaginationService from '@/service/pagination.service';

interface IProps {
  data: any;
}

const PaginationInput = ({ data }: IProps) => {
  const { changePage, handleSetPage, pageNumber, paginationNumber } =
    usePaginationService(data);
  return (
    <Pagination className="text-right">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => changePage(Number(pageNumber) - 1)}
            className="bg-primaryColor text-white hover:bg-black hover:text-white"
          />
        </PaginationItem>
        {Array(paginationNumber)
          .fill(null)
          .map((_, index) => (
            <PaginationItem
              key={index}
              onClick={() => handleSetPage(`${index + 1}`)}
              className={`${
                index + 1 == Number(pageNumber)
                  ? 'bg-slate-700 text-white rounded-lg'
                  : ''
              }`}
            >
              <PaginationLink>{index + 1}</PaginationLink>
            </PaginationItem>
          ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => changePage(Number(pageNumber) + 1)}
            className="bg-primaryColor text-white hover:bg-black hover:text-white"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationInput;

import { ArrowUpDown } from 'lucide-react';

interface TableHeadStyledProps {
  children: React.ReactNode;
  onClick: () => void;
}
const TableHeadStyled = ({ children, onClick }: TableHeadStyledProps) => {
  return (
    <th
      onClick={onClick}
      className="flex flex-row p-4 w-full justify-between items-center hover:bg-slate-50 cursor-pointer"
    >
      {children}
      <ArrowUpDown className="h-4 w-4" />
    </th>
  );
};

export default TableHeadStyled;

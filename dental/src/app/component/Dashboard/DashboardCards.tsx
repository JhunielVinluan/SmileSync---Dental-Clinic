import { activeSideMenu } from '@/store/store';
import { useSetAtom } from 'jotai';
import { PlusCircle } from 'lucide-react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface DashboardCardsProps {
  color: {
    primary: string;
    secondary: string;
  };
  icon: ReactNode;
  value: number;
  label: string;
  link: string;
  page: string;
}

const DashboardCards = ({
  color,
  icon,
  value,
  label,
  link,
  page,
}: DashboardCardsProps) => {
  const navigate = useNavigate();
  const setActive = useSetAtom(activeSideMenu);

  const handlePageRoute = () => {
    setActive(page);
    navigate(link);
  };
  return (
    <div
      className=" w-1/2 rounded-xl "
      style={{ backgroundColor: color.primary }}
    >
      <div className="w-full  h-42  flex flex-row justify-between p-6 items-center text-white">
        <div className=" font-bold">
          <p className="text-6xl">{value}</p>
          <p className="text-3xl">{label}</p>
        </div>
        {icon}
      </div>
      <div
        onClick={handlePageRoute}
        className="flex flex-row gap-2 text-xl items-center justify-center text-white p-4 rounded-b-xl "
        style={{ backgroundColor: color.secondary }}
      >
        <p>More Info </p>
        <PlusCircle />
      </div>
    </div>
  );
};

export default DashboardCards;

import { $httpGet } from '@/api/_api';
import { SETTINGS } from '@/constants/settings.constants';
import { scheduleDataAtom } from '@/store/store';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

const useScheduleService = () => {
  const [sort, setSort] = useState<string>();
  const [showDeclaration, setShowDeclaration] = useState<boolean>(false);
  const [schedule, setSchedule] = useAtom(scheduleDataAtom);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-orange-500';
      case 'Confirm':
        return 'bg-statusConfirm';
        case 'Complete':
          return 'bg-statusComplete';
      case 'Pending':
        return 'bg-statusPending';
      case 'Canceled':
        return 'bg-statusCancelled';
      default:
        return 'bg-green-500';
    }
  };

  const getAllAppointment = async () => {
    try {
      const response = await $httpGet(SETTINGS.URL.API.GET_SCHEDULE, {});
      const data = await response.json();
      if (response.status === 200) {
        setSchedule(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllAppointment();
  }, []);

  const filteredAppointment = schedule?.filter(
    (scheduleItem) =>
      scheduleItem.userFullName
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      scheduleItem.startTime
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()),
  );

  return {
    handleStatusColor,
    filteredAppointment,
    sort,
    setSort,
    showDeclaration,
    setShowDeclaration,
    setSearchQuery,
  };
};

export default useScheduleService;

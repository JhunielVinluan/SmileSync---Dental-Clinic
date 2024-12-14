import { $httpGet } from '@/api/_api';
import { SETTINGS } from '@/constants/settings.constants';
import { appointmentDataAtom } from '@/store/store';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
type AnswerObject = {
  answer: string;
  specify: string;
};
const useAppointmentService = (type = 'walk-in') => {
  const [sort, setSort] = useState<string>();
  const [showDeclaration, setShowDeclaration] = useState<boolean>(false);
  const [declarationData, setDeclarationData] = useState<AnswerObject[]>()
  const [appointment, setAppointment] = useAtom(appointmentDataAtom);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleExport = () => {
    console.log('handle');
  };

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
      const response = await $httpGet(
        type == 'walk-in'
          ? SETTINGS.URL.API.GET_WALKIN_APPOINTMENT
          : SETTINGS.URL.API.GET_ONLINE_APPOINTMENT,
        {},
      );
      const data = await response.json();
      if (response.status === 200) {
        setAppointment(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllAppointment();
  }, []);

  const filteredAppointment = appointment?.filter(
    (appointmentItem) =>
      appointmentItem.userFullName
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      appointmentItem.startTime
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      appointmentItem.description
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      appointmentItem.service
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      appointmentItem.appointmentStatus
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()),
  );

  return {
    handleStatusColor,
    handleExport,
    filteredAppointment,
    sort,
    setSort,
    showDeclaration,
    setShowDeclaration,
    setSearchQuery,
    setDeclarationData,
    declarationData
  };
};

export default useAppointmentService;

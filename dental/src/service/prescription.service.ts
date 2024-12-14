import { $httpGet } from '@/api/_api';
import { SETTINGS } from '@/constants/settings.constants';
import { prescriptionDataAtom } from '@/store/store';
import { PrescriptionInfoType } from '@/types/appointment';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

const usePrescriptionService = () => {
  const [sort, setSort] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [prescription, setPrescription] = useAtom(prescriptionDataAtom);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPrescription, setSelectedPrescription] =
    useState<PrescriptionInfoType>();

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

  const getAllPrescription = async () => {
    try {
      const response = await $httpGet(SETTINGS.URL.API.GET_PRESCRIPTION, {});
      const data = await response.json();
      if (response.status === 200) {
        setPrescription(data);
        console.log({ data, heheeh: false })
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPrescription();
  }, []);

  const filteredPrescription = prescription?.filter(
    (appointmentItem) =>
      appointmentItem.userFullName
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      appointmentItem.notes
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      appointmentItem.medicine
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()),
  );

  return {
    handleStatusColor,
    filteredPrescription,
    sort,
    setSort,
    showModal,
    setShowModal,
    setSearchQuery,
    setSelectedPrescription,
    selectedPrescription,
  };
};

export default usePrescriptionService;

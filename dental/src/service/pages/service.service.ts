import { $httpGet } from '@/api/_api';
import { SETTINGS } from '@/constants/settings.constants';
import { actionDataAtom, serviceDataAtom } from '@/store/store';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

type ActionType = 'create' | 'view' | 'edit' | 'delete' | null;

const useServiceService = () => {
  const [services, setService] = useAtom(serviceDataAtom);
  const [action, setAction] = useAtom(actionDataAtom);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAction = (type: ActionType, data: any) => {
    setAction({
      type,
      data,
    });
  };

  const handleCloseForms = () => {
    setAction({
      type: null,
      data: {},
    });
  };

  const filteredServices = services?.filter(
    (serviceItem) =>
      serviceItem.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      serviceItem.description
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      serviceItem.status?.toLowerCase().includes(searchQuery?.toLowerCase()),
  );

  const getAllSurgicalEquipment = async () => {
    try {
      const response = await $httpGet(SETTINGS.URL.API.GET_SURGICAL, {});
      const data = await response.json();
      if (response.status === 200) {
        setService(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSurgicalEquipment();
  }, []);

  return {
    handleAction,
    setSearchQuery,
    handleCloseForms,
    filteredServices,
    action,
  };
};

export default useServiceService;

import { $httpGet, $httpPost } from '@/api/_api';
import { SETTINGS } from '@/constants/settings.constants';
import useConfirmActionService from '@/service/confirmAction.service';
import { UserAccountType } from '@/types/patient';
import { useEffect, useState } from 'react';

const useValidationService = () => {
  const [sort, setSort] = useState<string>();
  const [showDeclaration, setShowDeclaration] = useState<boolean>(false);
  const [userAccount, setUserAccount] = useState<UserAccountType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { confirmAction, resultAction } = useConfirmActionService();

  const handleExport = () => {
    console.log('handle');
  };

  const handleStatusColor = (status: boolean) => {
    if (status) {
      return 'bg-green-500';
    }
    return 'bg-red-500';
  };

  const getAllAppointment = async () => {
    try {
      const response = await $httpGet(SETTINGS.URL.API.GET_USER_ACCOUNTS, {});
      const data = await response.json();
      if (response.status === 200) {
        setUserAccount(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllAppointment();
  }, []);

  const filteredAppointment = userAccount?.filter(
    (appointmentItem) =>
      appointmentItem.firstName
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      appointmentItem.lastName
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      appointmentItem.email?.toLowerCase().includes(searchQuery?.toLowerCase()),
  );

  const verifyAction = async (id: string, isVerified: boolean) => {
    try {
      const confirm = await confirmAction('Verifying User...');
      if (!confirm) return;
      const response = await $httpPost(
        `${SETTINGS.URL.API.VERIFY_USER_ACCOUNT(id)}`,
        {
          isVerified: isVerified,
        },
      );
      const data = await response.json();
      if (response.status === 200) {
        resultAction('Successfully updated', 'Successful');
        console.log({ data });
        getAllAppointment();
      } else {
        resultAction('Failed to update', 'Failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleStatusColor,
    handleExport,
    filteredAppointment,
    sort,
    setSort,
    showDeclaration,
    setShowDeclaration,
    setSearchQuery,
    verifyAction,
  };
};

export default useValidationService;

import { $httpGet } from '@/api/_api';
import { SETTINGS } from '@/constants/settings.constants';
import { userDataDropDownAtom } from '@/store/store';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

interface reportsType {
  appointmentPendingData: number;
  appointmentCompletedData: number;
  surgicalData: number;
  patientData: number;
}
const useDashboardService = () => {
  const [reports, setReports] = useState<reportsType>({
    appointmentPendingData: 0,
    appointmentCompletedData: 0,
    surgicalData: 0,
    patientData: 0,
  });
  const setUser = useSetAtom(userDataDropDownAtom);

  const getAllInfo = async () => {
    try {
      const response = await $httpGet(SETTINGS.URL.API.GET_ALL_REPORTS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (response.status === 200) {
        setReports(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUser = async () => {
    try {
      const response = await $httpGet(SETTINGS.URL.API.GET_USER);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.user) {
        const reWriteUser = data.user.map((user: any) => ({
          id: user._id,
          email: user.email,
          label: `${user.firstName} ${user.lastName}`,
          value: user._id,
          fullname: `${user.firstName} ${user.lastName}`,
        }));
        setUser(reWriteUser);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };
  useEffect(() => {
    getAllInfo();
    getAllUser();
  }, []);

  return { reports };
};

export default useDashboardService;

import { $httpGet } from '@/api/_api';
import { SETTINGS } from '@/constants/settings.constants';
import { actionDataAtom, patientDataAtom } from '@/store/store';
import { ActionType } from '@/types/app.types';
import { PatientInfo } from '@/types/patient';
import { isSameMonth, isSameWeek, isToday, parseISO } from 'date-fns';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

const usePatientService = () => {
  const [patients, setPatients] = useAtom(patientDataAtom);
  const [backup, setBackup] = useState<PatientInfo[]>([]);
  const [action, setAction] = useAtom(actionDataAtom);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [patientId, setPatientId] = useState<string>('');
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

  const filteredPatients = patients.filter(
    (patient) =>
      patient.firstName?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      patient.lastName?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      patient.address?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      patient.birthdate?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      patient.contactNumber?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchQuery?.toLowerCase()) 
  );

  const getAllPatient = async () => {
    try {
      const response = await $httpGet(SETTINGS.URL.API.GET_PATIENT, {});
      const data: PatientInfo[] = await response.json();
      if (response.status === 200) {
        setPatients(data);
        setBackup(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterPatientsByTimeframe = (timeframe: string) => {
    const now = new Date();
    if (timeframe == 'all') {
      setPatients(backup);
    }
    if (timeframe === 'month') {
      const filter = patients.filter((patient) =>
        isSameMonth(parseISO(patient.createdAt), now),
      );
      setPatients(filter);
    }

    if (timeframe === 'week') {
      const filter = patients.filter((patient) =>
        isSameWeek(parseISO(patient.createdAt), now),
      );
      setPatients(filter);
    }

    if (timeframe === 'day') {
      const filter = patients.filter((patient) =>
        isToday(parseISO(patient.createdAt)),
      );
      setPatients(filter);
    }
  };

  useEffect(() => {
    getAllPatient();
  }, []);

  return {
    handleAction,
    setSearchQuery,
    handleCloseForms,
    filteredPatients,
    filterPatientsByTimeframe,
    action,
    patientId,
    setPatientId,
  };
};

export default usePatientService;

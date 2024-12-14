import { $httpGet } from '@/api/_api';
import { SETTINGS } from '@/constants/settings.constants';
import { treatmentDataAtom } from '@/store/store';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

const useTreatmentService = () => {
  const [sort, setSort] = useState<string>();
  const [showDeclaration, setShowDeclaration] = useState<boolean>(false);
  const [treatment, setTreatment] = useAtom(treatmentDataAtom);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleExport = (e: any) => {
    console.log(e.target.value);
  };

  const getAllTreatment = async () => {
    try {
      const response = await $httpGet(SETTINGS.URL.API.GET_TREATMENT, {});
      const data = await response.json();
      if (response.status === 200) {
        setTreatment(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTreatment();
  }, []);

  const filteredTreatment = treatment?.filter(
    (treatmentItem) =>
      treatmentItem.userFullName
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      treatmentItem.description
        ?.toLowerCase()
        .includes(searchQuery?.toLowerCase()) ||
      treatmentItem.fees?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
      treatmentItem.remarks?.toLowerCase().includes(searchQuery?.toLowerCase()),
  );

  return {
    handleExport,
    filteredTreatment,
    sort,
    setSort,
    showDeclaration,
    setShowDeclaration,
    setSearchQuery,
  };
};

export default useTreatmentService;

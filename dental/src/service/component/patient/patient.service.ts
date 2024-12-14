import { $httpDelete, $httpGet, $httpPatch, $httpPost } from '@/api/_api';
import { SETTINGS } from '@/constants/settings.constants';
import { PatientSchema } from '@/schema/form.schema';
import useConfirmActionService from '@/service/confirmAction.service';
import {
  actionDataAtom,
  patientDataAtom,
  userDataDropDownAtom,
} from '@/store/store';
import { PatientSchemaType } from '@/types/appointment';
import { removeItemData, updateItemData } from '@/utils/common.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const usePatientFormService = () => {
  const { confirmAction, resultAction } = useConfirmActionService();
  const [patients, setPatients] = useAtom(patientDataAtom);
  const [action, setAction] = useAtom(actionDataAtom);
  const [user] = useAtom(userDataDropDownAtom);

  // Using useForm to get setValue
  const {
    handleSubmit,
    register,
    setValue,  // Added setValue here
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PatientSchemaType>({
    resolver: zodResolver(PatientSchema),
    defaultValues: action.data,
  });

  useEffect(() => {
    if (action?.data) {
      reset(action.data);
    }
  }, [action, reset]);

  const getAllPatient = async () => {
    try {
      const response = await $httpGet(SETTINGS.URL.API.GET_PATIENT, {});
      const data = await response.json();
      if (response.status === 200) {
        setPatients(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createPatient = async (patientData: any) => {
    try {
      const confirm = await confirmAction('Creating Patient...');
      if (confirm) {
        const response = await $httpPost(
          SETTINGS.URL.API.CREATE_PATIENT,
          patientData,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          resultAction('Patient successfully created', 'Successful');
          getAllPatient();
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  const editPatient = async (patientData: any, _id: string) => {
    try {
      const confirm = await confirmAction('Editing Patient...');
      if (confirm) {
        const response = await $httpPatch(
          SETTINGS.URL.API.EDIT_PATIENT(_id),
          patientData,
        );
        if (!response.ok) {
          resultAction('Patient successfully updated', 'Successful');
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          const updatedData = updateItemData(patients, {
            _id,
            ...patientData,
          });
          setPatients(updatedData);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  const deletePatient = async (patientID: string) => {
    try {
      const confirm = await confirmAction('Deleting Patient...');
      if (confirm) {
        const response = await $httpDelete(
          SETTINGS.URL.API.DELETE_PATIENT(patientID),
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          resultAction('Patient successfully deleted', 'Successful');
          const deleteData = removeItemData(patients, patientID);
          setPatients(deleteData);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  const onSubmit: SubmitHandler<PatientSchemaType> = (formData) => {
    if (action.type == 'create') {
      createPatient(formData);
    } else if (action.type == 'edit') {
      editPatient(formData, action?.data?._id);
    }
    setAction({ type: null, data: {} });
  };

  return {
    handleSubmit,
    register,
    errors,
    onSubmit,
    deletePatient,
    isSubmitting,
    data: action.data,
    type: action.type,
    user,
    setValue,  // Returning setValue here
  };
};

export default usePatientFormService;

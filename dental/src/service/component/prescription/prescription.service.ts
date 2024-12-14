import { $httpDelete, $httpGet, $httpPatch, $httpPost } from '@/api/_api';
import {
  dentalServicesConstant,
  dentistConstant,
} from '@/constants/common.constants';
import { SETTINGS } from '@/constants/settings.constants';
import { PrescriptionSchema } from '@/schema/form.schema';
import useConfirmActionService from '@/service/confirmAction.service';
import usePopUpService from '@/service/popUp.service';
import {
  actionDataAtom,
  prescriptionDataAtom,
  userDataDropDownAtom,
} from '@/store/store';
import { newAppointmentType, PrescriptionSchemaType } from '@/types/appointment';
import { removeItemData } from '@/utils/common.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const usePrescriptionService = () => {
  const [dateVisit, setDateVisit] = useState<Date | undefined>(new Date());
  const [action] = useAtom(actionDataAtom);
  const [prescription, setPrescription] = useAtom(prescriptionDataAtom);
  const { confirmAction, resultAction } = useConfirmActionService();
  const [dentist] = useState(dentistConstant);
  const [dentalServices] = useState(dentalServicesConstant);
  const { handleCloseForms } = usePopUpService();
  const [appointment, setAppointment] = useState<newAppointmentType[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const [user] = useAtom(userDataDropDownAtom);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PrescriptionSchemaType>({
    resolver: zodResolver(PrescriptionSchema),
    defaultValues: {
      dateVisit: new Date(),
    },
  });

  const getAllAppointment = async () => {
    try {
      const response = await $httpGet(SETTINGS.URL.API.GET_ALL_APPOINTMENT, {});
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

  useEffect(() => {
    const newDate = new Date(); // Initialize with the current date
    setDateVisit(newDate); // Set the initial state
    setValue('dateVisit', newDate); // Sync initial value with react-hook-form
  }, []); // Run only once on mount

  useEffect(() => {
    if (dateVisit) {
      setValue('dateVisit', dateVisit); // Update react-hook-form when dateVisit changes
    }
  }, [dateVisit, setValue]);

  useEffect(() => {
    if (action?.data) {
      reset({
        ...action.data,
        dateVisit: action.data.dateVisit
          ? new Date(action.data.dateVisit)
          : new Date(),
      });
    }
  }, [action, reset]);

  const getAllPrescription = async () => {
    try {
      const response = await $httpGet(SETTINGS.URL.API.GET_PRESCRIPTION, {});
      const data = await response.json();
      if (response.status === 200) {
        setPrescription(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createPrescription = async (prescriptionData: any) => {
    try {
      const confirm = await confirmAction('Creating Prescription...');
      if (confirm) {
        const response = await $httpPost(
          SETTINGS.URL.API.CREATE_PRESCRIPTION,
          prescriptionData,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 201) {
          resultAction('Prescription successfully created', 'Successful');
          getAllPrescription();
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

  const editPrescription = async (prescriptionData: any, _id: string) => {
    try {
      const confirm = await confirmAction('Editing Prescription...');
      if (confirm) {
        const response = await $httpPatch(
          SETTINGS.URL.API.EDIT_PRESCRIPTION(_id),
          prescriptionData,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          resultAction('Prescription successfully updated', 'Successful');
          getAllPrescription();
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
  const onSubmit: SubmitHandler<PrescriptionSchemaType> = (formData) => {
    handleCloseForms();
    if (action.type == 'create') {
      createPrescription(formData);
    } else if (action.type == 'edit') {
      editPrescription(formData, action?.data?._id);
    }
    console.log({ formData });
  };

  const deletePrescription = async (appointmentId: string) => {
    try {
      const confirm = await confirmAction('Deleting Appointment...');
      if (confirm) {
        const response = await $httpDelete(
          SETTINGS.URL.API.DELETE_PRESCRIPTION(appointmentId),
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          resultAction('Appointment successfully Deleted', 'Successful');
          const deleteData = removeItemData(prescription, appointmentId);
          setPrescription(deleteData);
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

  return {
    user,
    dentist,
    dentalServices,
    dateVisit,
    setDateVisit,
    deletePrescription,
    handleSubmit,
    register,
    errors,
    onSubmit,
    isSubmitting, setSelectedUser,
    selectedUser, appointment,
  };
};

export default usePrescriptionService;

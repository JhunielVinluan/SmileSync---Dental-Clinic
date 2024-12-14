import { $httpDelete, $httpGet, $httpPatch, $httpPost } from '@/api/_api';
import {
  dentalServicesConstant,
  dentistConstant,
} from '@/constants/common.constants';
import { SETTINGS } from '@/constants/settings.constants';
import { TreatmentSchema } from '@/schema/form.schema';
import useConfirmActionService from '@/service/confirmAction.service';
import usePopUpService from '@/service/popUp.service';
import {
  actionDataAtom,
  treatmentDataAtom,
  userDataDropDownAtom,
} from '@/store/store';
import { newAppointmentType, TreatmentSchemaType } from '@/types/appointment';
import { removeItemData } from '@/utils/common.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const useTreatmentService = () => {
  const { handleCloseForms } = usePopUpService();
  const [dateVisit, setDateVisit] = useState<Date | undefined>(new Date());
  const [action] = useAtom(actionDataAtom);
  const [treatment, setTreatment] = useAtom(treatmentDataAtom);
  const { confirmAction, resultAction } = useConfirmActionService();
  const [dentist] = useState(dentistConstant);
  const [dentalServices] = useState(dentalServicesConstant);
  const [appointment, setAppointment] = useState<newAppointmentType[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>("")
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [user] = useAtom(userDataDropDownAtom);
  const {
    handleSubmit,
    register, setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TreatmentSchemaType>({
    resolver: zodResolver(TreatmentSchema),
  });


  const getAllAppointment = async () => {
    try {
      const response = await $httpGet(SETTINGS.URL.API.GET_ALL_APPOINTMENT, {});
      const data = await response.json();

      if (response.status === 200 && Array.isArray(data)) {
        setAppointment(data);
      } else {
        console.error('Unexpected data format or status:', { data, status: response.status });
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    getAllAppointment();
  }, []);

  useEffect(() => {
    if (action?.data) {
      reset({
        ...action.data,
        dateVisit: action.data.dateVisit
          ? new Date(action.data.dateVisit)
          : undefined,
      });
    }
  }, [action, reset]);

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

  const createTreatment = async (treatmentData: any) => {
    try {
      const confirm = await confirmAction('Creating Treatment...');
      if (confirm) {
        const response = await $httpPost(
          SETTINGS.URL.API.CREATE_TREATMENT,
          treatmentData,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 201) {
          resultAction('Appointment successfully created', 'Successful');
          getAllTreatment();
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

  const editTreatment = async (appointmentData: any, _id: string) => {
    try {
      const confirm = await confirmAction('Editing Treatment...');
      if (confirm) {
        const response = await $httpPatch(
          SETTINGS.URL.API.EDIT_TREATMENT(_id),
          appointmentData,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          resultAction('Treatment successfully updated', 'Successful');
          getAllTreatment();
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
  const onSubmit: SubmitHandler<TreatmentSchemaType> = (formData) => {
    handleCloseForms();
    if (action.type == 'create') {
      createTreatment(formData);
    } else if (action.type == 'edit') {
      editTreatment(formData, action?.data?._id);
    }
    console.log({ formData });
  };

  const deleteTreatment = async (treatmentId: string) => {
    try {
      const confirm = await confirmAction('Deleting Appointment...');
      if (confirm) {
        const response = await $httpDelete(
          SETTINGS.URL.API.DELETE_TREATMENT(treatmentId),
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          resultAction('Appointment successfully Deleted', 'Successful');
          const deleteData = removeItemData(treatment, treatmentId);
          setTreatment(deleteData);
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
    appointment,
    dentist,
    dentalServices,
    dateVisit,
    setDateVisit,
    deleteTreatment,
    handleSubmit,
    register,
    errors,
    onSubmit,
    isSubmitting, setSelectedUser, selectedUser,
    setSelectedAppointment, selectedAppointment,
    setValue
  };
};

export default useTreatmentService;

import { $httpDelete, $httpPatch, $httpPost } from '@/api/_api';
import {
  dentalServicesConstant,
  dentistConstant,
} from '@/constants/common.constants';
import { SETTINGS } from '@/constants/settings.constants';
import { AppointmentSchema } from '@/schema/form.schema';
import useConfirmActionService from '@/service/confirmAction.service';
import usePopUpService from '@/service/popUp.service';
import {
  actionDataAtom,
  appointmentDataAtom,
  userDataDropDownAtom,
} from '@/store/store';
import { AppointmentSchemaType } from '@/types/appointment';
import {
  calculateDuration,
  createItemData,
  removeItemData,
  updateItemData,
} from '@/utils/common.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const useAppointmentService = () => {
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(
    new Date(),
  );
  const { handleCloseForms } = usePopUpService();
  const [action] = useAtom(actionDataAtom);
  const [appointment, setAppointment] = useAtom(appointmentDataAtom);
  const { confirmAction, resultAction } = useConfirmActionService();
  const [dentist] = useState(dentistConstant);
  const [dentalServices] = useState(dentalServicesConstant);
  const [appointmentType] = useState([
    { label: 'Walkin In', value: 'walk-in' },
    { label: 'Online', value: 'online' },
  ]);
  const [dentalStatus] = useState([
    { label: 'Pending', value: 'Pending' },
    { label: 'Complete', value: 'Complete' },
    { label: 'Canceled', value: 'Canceled' },
    { label: 'Confirmed', value: 'Confirmed' },
  ]);
  const [user] = useAtom(userDataDropDownAtom);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AppointmentSchemaType>({
    resolver: zodResolver(AppointmentSchema),
  });

  useEffect(() => {
    if (action?.data) {
      // setAppointmentDate(new Date(action.data?.appointmentDate));
      reset(action.data);
    }
  }, [action, reset]);

  const createAppointment = async (apppointmentData: any) => {
    try {
      const confirm = await confirmAction('Creating Appointment...');
      console.log(apppointmentData)
      if (confirm) {
        const response = await $httpPost(
          SETTINGS.URL.API.CREATE_PATIENT_APPOINTMENT,
          apppointmentData,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          resultAction('Appointment successfully created', 'Successful');
          const addItem = createItemData(appointment, apppointmentData);
          setAppointment(addItem);
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

  const editAppointment = async (appointmentData: any, _id: string) => {
    try {
      const confirm = await confirmAction('Editing Appointment...');
      if (confirm) {
        const response = await $httpPatch(
          SETTINGS.URL.API.EDIT_APPOINTMENT(_id),
          appointmentData,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          resultAction('Appointment successfully updated', 'Successful');
          console.log({ date_ko: appointmentData.appointmentDate });
          const updatedData = updateItemData(appointment, {
            _id,
            ...appointmentData,
          });
          setAppointment(updatedData);
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
  const onSubmit: SubmitHandler<AppointmentSchemaType> = (formData) => {
    const { timeEnd, timeStart } = formData;
    console.log({ formData })
    const minutesDuration = calculateDuration(timeStart, timeEnd).toString();
    console.log({ minutesDuration })
    handleCloseForms();
    if (appointmentDate) {
      const adjustedAppointmentDate = new Date(
        appointmentDate.getTime() + 8 * 60 * 60 * 1000,
      );
      const body = {
        ...formData,
        appointmentDate: adjustedAppointmentDate,
        minutesDuration,
      };
      if (action.type == 'create') {
        createAppointment(body);
      } else if (action.type == 'edit') {
        editAppointment(body, action?.data?._id);
      }
    }
  };

  const deleteAppointment = async (appointmentId: string) => {
    try {
      const confirm = await confirmAction('Deleting Appointment...');
      if (confirm) {
        const response = await $httpDelete(
          SETTINGS.URL.API.DELETE_APPOINTMENT(appointmentId),
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          resultAction('Appointment successfully Deleted', 'Successful');
          const deleteData = removeItemData(appointment, appointmentId);
          setAppointment(deleteData);
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
    dentalStatus,
    appointmentDate,
    appointmentType,
    setAppointmentDate,
    deleteAppointment,
    handleSubmit,
    register,
    errors,
    onSubmit,
    isSubmitting,
  };
};

export default useAppointmentService;

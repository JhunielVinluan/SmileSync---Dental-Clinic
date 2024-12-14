import { $httpDelete, $httpGet, $httpPatch, $httpPost } from '@/api/_api';
import {
  dentalServicesConstant,
  dentistConstant,
} from '@/constants/common.constants';
import { SETTINGS } from '@/constants/settings.constants';
import { ScheduleSchema } from '@/schema/form.schema';
import useConfirmActionService from '@/service/confirmAction.service';
import usePopUpService from '@/service/popUp.service';
import { actionDataAtom, scheduleDataAtom } from '@/store/store';
import { ScheduleSchemaType } from '@/types/appointment';
import { removeItemData } from '@/utils/common.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const useScheduleService = () => {
  const [dateVisit, setDateVisit] = useState<Date | undefined>(new Date());
  const [action] = useAtom(actionDataAtom);
  const [schedule, setSchedule] = useAtom(scheduleDataAtom);
  const { confirmAction, resultAction } = useConfirmActionService();
  const [dentist] = useState(dentistConstant);
  const [dentalServices] = useState(dentalServicesConstant);
  const { handleCloseForms } = usePopUpService();

  const [user] = useState([
    {
      id: 'Dr. Siyo R. Vallao',
      email: 'dentist@gmail.com',
      label: 'Dr. Siyo R. Vallao',
      value: 'Dr. Siyo R. Vallao',
      fullName: 'Dr. Siyo R. Vallao',
    },
  ]);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ScheduleSchemaType>({
    resolver: zodResolver(ScheduleSchema),
  });
  useEffect(() => {
    const newDate = new Date(); // Initialize with the current date
    setDateVisit(newDate); // Set the initial state
    setValue('day', newDate); // Sync initial value with react-hook-form
  }, []); // Run only once on mount



  useEffect(() => {
    if (dateVisit) {
      setValue('day', dateVisit); // Update react-hook-form when dateVisit changes
    }
  }, [dateVisit, setValue]);

  useEffect(() => {
    if (action?.data) {
      reset({
        ...action.data,
        day: action.data.day ? new Date(action.data.day) : undefined,
      });
    }
  }, [action, reset]);

  const getAllSchedule = async () => {
    try {
      const response = await $httpGet(SETTINGS.URL.API.GET_SCHEDULE, {});
      const data = await response.json();
      if (response.status === 200) {
        console.log('triggered', data);
        setSchedule(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createSchedule = async (scheduleData: any) => {
    try {
      const confirm = await confirmAction('Creating Schedule...');
      if (confirm) {
        const response = await $httpPost(
          SETTINGS.URL.API.CREATE_SCHEDULE,
          scheduleData,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 201) {
          resultAction('Schedule successfully created', 'Successful');
          getAllSchedule();
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

  const editSchedule = async (scheduleData: any, _id: string) => {
    try {
      const confirm = await confirmAction('Editing Schedule...');
      if (confirm) {
        const response = await $httpPatch(
          SETTINGS.URL.API.EDIT_SCHEDULE(_id),
          scheduleData,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          resultAction('Schedule successfully updated', 'Successful');
          getAllSchedule();
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
  const onSubmit: SubmitHandler<ScheduleSchemaType> = (formData) => {
    handleCloseForms();
    if (action.type == 'create') {
      createSchedule(formData);
    } else if (action.type == 'edit') {
      editSchedule(formData, action?.data?._id);
    }
    console.log({ formData });
  };

  const deleteSchedule = async (appointmentId: string) => {
    try {
      const confirm = await confirmAction('Deleting Appointment...');
      if (confirm) {
        const response = await $httpDelete(
          SETTINGS.URL.API.DELETE_SCHEDULE(appointmentId),
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          resultAction('Appointment successfully Deleted', 'Successful');
          const deleteData = removeItemData(schedule, appointmentId);
          setSchedule(deleteData);
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
    deleteSchedule,
    handleSubmit,
    register,
    errors,
    onSubmit,
    isSubmitting,
  };
};

export default useScheduleService;

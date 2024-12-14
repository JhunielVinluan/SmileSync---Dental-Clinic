import { $httpDelete, $httpPatch, $httpPost } from '@/api/_api';
import { SETTINGS } from '@/constants/settings.constants';
import { SurgicalSchema } from '@/schema/form.schema';
import useConfirmActionService from '@/service/confirmAction.service';
import { actionDataAtom, serviceDataAtom } from '@/store/store';
import { SurgicalSchemaType } from '@/types/service.types';
import {
  createItemData,
  removeItemData,
  updateItemData,
} from '@/utils/common.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const useSurgicalFormService = () => {
  const { confirmAction, resultAction } = useConfirmActionService();
  const [surgical, setSurgical] = useAtom(serviceDataAtom);
  const [action, setAction] = useAtom(actionDataAtom);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SurgicalSchemaType>({
    resolver: zodResolver(SurgicalSchema),
    defaultValues: action.data,
  });

  useEffect(() => {
    if (action?.data) {
      reset(action.data);
    }
  }, [action, reset]);

  const createSurgical = async (surgicalData: any) => {
    try {
      const confirm = await confirmAction('Creating Surgical...');
      if (confirm) {
        const response = await $httpPost(
          SETTINGS.URL.API.CREATE_SURGICAL,
          surgicalData,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          resultAction('Surgical successfully created', 'Successful');
          const addItem = createItemData(surgical, surgicalData);
          setSurgical(addItem);
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
  const editSurgical = async (surgicalData: any, _id: string) => {
    try {
      const confirm = await confirmAction('Editing Surgical...');
      if (confirm) {
        const response = await $httpPatch(
          SETTINGS.URL.API.EDIT_SURGICAL(_id),
          surgicalData,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          resultAction('Surgical successfully edited', 'Successful');
          const updatedData = updateItemData(surgical, {
            _id,
            ...surgicalData,
          });
          setSurgical(updatedData);
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

  const deleteSurgical = async (patientID: string) => {
    try {
      const confirm = await confirmAction('Surgical successfully deleted');
      if (confirm) {
        const response = await $httpDelete(
          SETTINGS.URL.API.DELETE_SURGICAL(patientID),
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        if (response.status === 200) {
          resultAction('Surgical successfully deleted', 'Successful');
          const deleteData = removeItemData(surgical, patientID);
          setSurgical(deleteData);
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

  const onSubmit: SubmitHandler<SurgicalSchemaType> = (formData) => {
    if (action.type == 'create') {
      createSurgical(formData);
    } else if (action.type == 'edit') {
      editSurgical(formData, action?.data?._id);
    }
    setAction({ type: null, data: {} });
  };

  return {
    handleSubmit,
    register,
    errors,
    onSubmit,
    deleteSurgical,
    isSubmitting,
    data: action.data,
    type: action.type,
  };
};

export default useSurgicalFormService;

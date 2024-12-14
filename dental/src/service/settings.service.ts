import { $httpPatch, $httpPost } from '@/api/_api';
import { SETTINGS } from '@/constants/settings.constants';
import { UserSchema } from '@/schema/form.schema';
import useConfirmActionService from '@/service/confirmAction.service';
import { userInfoAtom } from '@/store/store';
import { IUser, UserSchemaType } from '@/types/setting.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const useSettingsService = () => {
  const [user, setUser] = useAtom(userInfoAtom);
  const [userInfo, setUserInfo] = useState<IUser>();
  const { confirmAction, resultAction } = useConfirmActionService();
  const [userImage, setUserImage] = useState<string>('no-user.webp');

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: userInfo,
  });

  const getUserInfo = async () => {
    try {
      const response = await $httpPost(
        SETTINGS.URL.API.GET_USER_BY_ID(user.id),
        {},
      );
      const data = await response.json();
      const userData = {
        ...data.user,
        userImage: data.user.userImage?.secure_url || '', // Ensure userImage is a string URL
      };
      setUserInfo(userData);
      setUser({
        id: data.user._id,
        userImage: data.user.userImage || '',
        role: data.user.role,
        fullName: data.user.firstName + ' ' + data.user.lastName,
      });
      setUserImage(data.user.userImage?.secure_url || '');
      reset(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserInfo = async (formData: any) => {
    try {
      const confirm = await confirmAction('Updating User Info...');
      if (confirm) {
        const response = await $httpPatch(
          SETTINGS.URL.API.UPDATE_USER(user.id),
          formData,
        );
        const data = await response.json();
        if (response.status === 200) {
          resultAction('User Info successfully updated', 'Successful');
          getUserInfo();
          reset(data.user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, [setUserInfo]);

  const onSubmit: SubmitHandler<UserSchemaType> = (formData) => {
    updateUserInfo(formData);
  };

  return {
    handleSubmit,
    register,
    errors,
    reset,
    setValue,
    isSubmitting,
    onSubmit,
    user,
    userImage,
    setUserImage,
  };
};

export default useSettingsService;

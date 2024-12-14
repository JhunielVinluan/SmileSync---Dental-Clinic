import { $httpGet } from '@/api/_api';
import NotificationItem from '@/app/component/Header/NotificationItem';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { SETTINGS } from '@/constants/settings.constants';
import { userInfoAtom } from '@/store/store';
import { NotificationData } from '@/types/appointment';
import { isToday, parseISO } from 'date-fns';
import { useAtom } from 'jotai';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

const Notification = () => {
  const [notif, setNotif] = useState<NotificationData[]>([]);
  const [userInfo] = useAtom(userInfoAtom);
  const fetchNotification = async () => {
    try {
      const { id } = userInfo;
      const response_user = await $httpGet(
        SETTINGS.URL.API.GET_NOTIFICATIONS_BY_ID(id),
        {},
      );

      if (response_user.status === 200) {
        const data_user = await response_user.json();

        // Update userName property for data_user based on appointmentDate
        const updatedDataUser = data_user.map((item: any) => ({
          ...item,
          userName: isToday(parseISO(item.appointmentDate))
            ? 'You have an appointment today'
            : item.userName, // Keep original name if not today
        }));

        setNotif([...updatedDataUser]);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  const fetchNotificationAdmin = async () => {
    try {
      const response = await $httpGet(SETTINGS.URL.API.GET_NOTIFICATIONS, {});
      if (response.status === 200) {
        const data = await response.json();
        setNotif(data);
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
    if (userInfo.role == 'admin') {
      fetchNotificationAdmin();
    } else {
      fetchNotification();
    }
  }, []);
  return (
    <Menubar className="bg-transparent border-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-transparent cursor-pointer flex   gap-2">
          <div className="relative">
            <Bell className="text-white" />
            <div className="bg-white absolute -bottom-1 -right-2 text-blue-500 rounded-full w-4 h-4 flex justify-center items-center">
              {notif.length}
            </div>
          </div>
        </MenubarTrigger>
        {notif.length > 0 && (
          <MenubarContent className="w-[25em] overflow-y-auto">
            <div className="my-2 px-4 fixed bg-white z-50 w-full h-12 -top-2">
              <div className="font-bold flex flex-col justify-center items-center absolute top-1/4">
                <p>Notification</p>
              </div>
            </div>
            <div className="mb-8"></div>
            {notif.map((notification) => (
              <MenubarItem key={notification._id}>
                <NotificationItem {...notification} />
              </MenubarItem>
            ))}
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  );
};

export default Notification;

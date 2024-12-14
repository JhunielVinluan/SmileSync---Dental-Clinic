import { useNavigate } from 'react-router-dom'; // React Router's navigate hook
import { useAtom } from 'jotai'; // Jotai for state management
import { NotificationData } from '@/types/appointment';
import { activeSideMenu, isAdminAtom } from '@/store/store'; // Import sidebar state and admin state atom

const NotificationItem = ({
  userId,
  appointmentDate,
  appointmentType,
  service,
  userName,
}: NotificationData) => {
  const navigate = useNavigate();
  const [isAdmin] = useAtom(isAdminAtom); // Get admin status
  const [, setActive] = useAtom(activeSideMenu); // Sidebar state setter
  const formattedDate = new Date(appointmentDate); // Date formatting if necessary (optional)

  const handleNotificationClick = () => {
    try {
      // Check if userId is available
      if (!userId) {
        console.error('User ID is missing or invalid');
        return;
      }

      // Set the sidebar active state if necessary
      setActive(isAdmin ? 'Online-Request' : 'DashboardUser');

      // Log the navigation path to ensure it's correct
      const navigatePath = isAdmin
        ? `/online-request?userId=${userId}`
        : `/dashboarduser?userId=${userId}&showAppointments=true`;

      console.log('Navigating to:', navigatePath);  // Log the navigation path
      navigate(navigatePath);  // Navigate to the appropriate page
    } catch (error) {
      console.error('Error handling notification click:', error);
    }
  };

  return (
    <div
      className="flex flex-row items-center gap-4 justify-between w-full cursor-pointer"
      onClick={handleNotificationClick}
    >
      <img
        src="/tooth.png"
        alt="image"
        className="w-8 h-8 bg-blue-200 rounded-full"
      />
      <div className="w-full">
        <p className="font-bold">{userName}</p>
        <p className="text-sm">
          Booked a {appointmentType} for {service}
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;

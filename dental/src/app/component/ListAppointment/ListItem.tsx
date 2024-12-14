import { AppointmentType } from '@/app/pages/Calendar';
import { formatTimeIfNeeded } from '@/utils/common.utils';
import { format } from 'date-fns';

const ListItem = ({
  appointment,
  onClick,
}: {
  appointment?: AppointmentType;
  onClick: () => void;
}) => {
  return (
    <div className="flex flex-col justify-start " onClick={onClick}>
      <div className="flex flex-row justify-between items-center p-2 border  bg-gray-100">
        <p>
          {format(
            new Date(appointment?.appointmentDate ?? new Date()),
            'MMM dd, yyyy',
          )}
        </p>
        <p>
          {format(
            new Date(appointment?.appointmentDate ?? new Date()),
            'EEEE',
          ).toUpperCase()}
        </p>
      </div>
      <div className="flex flex-col px-4 mt-2">
        <p>
          <span className="font-bold">
            {formatTimeIfNeeded(appointment?.timeStart ?? '') +
              '' +
              formatTimeIfNeeded(appointment?.timeEnd ?? '')}
          </span>
          - {appointment?.userName}
        </p>
      </div>
    </div>
  );
};

export default ListItem;

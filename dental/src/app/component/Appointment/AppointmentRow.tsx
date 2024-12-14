import { Ban, Check, CircleDot, Clock2, Star } from 'lucide-react';
import React from 'react';

interface IAppointmentRowProps {
  type?: string | undefined;
  description?: string | undefined;
}

const AppointmentRow: React.FC<IAppointmentRowProps> = ({
  type,
  description,
}) => {
  let icon;
  switch (type) {
    case 'Special':
      icon = <Star />;
      break;
    case 'Pending':
      icon = <CircleDot />;
      break;
    case 'Confirmation':
      icon = <Clock2 />;
      break;
    case 'Cancel':
      icon = <Ban />;
      break;
    case 'Completed':
      icon = <Check />;
      break;
    case 'None':
      icon = '';
      break;
  }
  return (
    <div
      className={`flex gap-2  w-full h-full p-2 ${type === 'time' ? 'text-center justify-center font-bold text-black' : 'text-white'}`}
    >
      {icon}
      {type !== 'none' && <p>{description}</p>}
    </div>
  );
};

export default AppointmentRow;

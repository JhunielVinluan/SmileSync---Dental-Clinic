interface AppointmentDataProps {
  data: {
    startTime: string;
    endTime: string;
    fullName: string;
    description: string;
  };
}
const AppointmentData = ({ data }: AppointmentDataProps) => {
  const { startTime, endTime, fullName, description } = data;
  return (
    <div className="flex flex-row items-center gap-4 bg-slate-100 p-3 rounded-lg my-2">
      <div className="flex flex-col">
        <p>{startTime}</p>
        <p>{endTime}</p>
      </div>
      <div className="h-12 w-1 bg-black"></div>
      <div className="flex flex-col">
        <p>{description}</p>
        <p>{fullName}</p>
      </div>
    </div>
  );
};

export default AppointmentData;

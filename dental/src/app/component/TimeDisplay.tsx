import { format } from 'date-fns';
const TimeDisplay = (): JSX.Element => {
  // const [formattedDate, setFormattedDate] = useState('');

  // useEffect(() => {
  //   const updateTime = () => {
  //     const date = new Date();
  //     const formatted = format(date, "MMM dd, yyyy EEE, h:mm:ss a");
  //     setFormattedDate(formatted);
  //   };

  //   // Initial call to display the time immediately
  //   updateTime();

  //   // Set up the interval to update the time every 60 seconds
  //   const intervalId = setInterval(updateTime, 1000);

  //   // Cleanup function to clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []);
  const date = new Date();
  const formattedDate = format(date, 'MMM dd, yyyy EEE, h:mm a');
  return (
    <div className="flex  items-center gap-2 bg-primaryColor w-1/4 p-2 justify-center text-white rounded-md">
      <p className="font-bold">{formattedDate}</p>
    </div>
  );
};

export default TimeDisplay;

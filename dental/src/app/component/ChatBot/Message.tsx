type MessageProps = {
  isUser: boolean;
  message: string;
};
const Message = ({
  isUser = false,
  message = 'Empty Message',
}: MessageProps) => {
  return (
    <div
      className={`flex gap-2 items-end ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <img src="/doctor.png" className="w-12 h-12" alt="doctor" />
      <div
        className={`p-2 rounded-xl ${isUser ? 'bg-primaryColor text-white' : 'bg-white'}`}
      >
        {message}
      </div>
    </div>
  );
};

export default Message;

const ChatButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="p-2 mt-40 border-gray-500 border-2 rounded-full w-24 h-24 absolute bottom-24 right-4 bg-white shadow-xl"
    >
      <img
        src="/teeth.png"
        alt="teeth image"
        height={300}
        width={300}
        className="mx-auto bg-primaryColor rounded-full"
      />
    </div>
  );
};

export default ChatButton;

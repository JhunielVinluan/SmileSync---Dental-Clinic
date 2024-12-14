import { Paperclip, SendHorizonal } from 'lucide-react';
import { useState } from 'react';

const ChatFooter = ({ onClick }: { onClick: (text: string) => void }) => {
  const [text, setText] = useState('');
  return (
    <div className="flex flex-row gap-2 p-2 px-4 border-t-2 border-gray-400 items-center w-full">
      <Paperclip className="text-primaryColor" />
      <input
        className="w-full h-10 focus:outline-none bg-chatboxColor"
        placeholder="Ask a question..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <SendHorizonal
        onClick={() => {
          setText('');
          onClick(text);
        }}
        className="text-gray-400"
      />
    </div>
  );
};

export default ChatFooter;

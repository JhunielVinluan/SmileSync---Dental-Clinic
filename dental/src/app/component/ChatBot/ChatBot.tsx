import { DENTAL_FAQ } from '@/app/component/ChatBot/ChatBot.response';
import ChatButton from '@/app/component/ChatBot/ChatButton';
import Message from '@/app/component/ChatBot/Message';
import { chatResponseAtom, isOpenChatBotAtom } from '@/store/store';
import { levenshteinDistance } from '@/utils/common.utils';
import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import './ChatBot.style.css';
import ChatFooter from './ChatFooter';
import Header from './Header';

const ChatBot = () => {
  const [isOpenChatBot, setIsOpenChatBot] = useAtom(isOpenChatBotAtom);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [chatResponse, setChatResponse] = useAtom(chatResponseAtom);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatResponse]);

  const handleBotResponse = (message: string) => {
    const cleanedMessage = message.toLowerCase().replace(/[^a-z0-9\s]/g, '');

    let closestMatch: { question: string; answer: string } | undefined;
    let lowestDistance = Infinity; // Start with a high value for comparison

    DENTAL_FAQ.forEach(({ question, answer }) => {
      const cleanedQuestion = question
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '');
      const distance = levenshteinDistance(cleanedMessage, cleanedQuestion);

      // Update closest match if this distance is lower
      if (distance < lowestDistance) {
        lowestDistance = distance;
        closestMatch = { question, answer };
      }
    });

    // Return the closest match if the distance is reasonable (e.g., < 5)
    return closestMatch && lowestDistance < 5
      ? closestMatch.answer
      : "I'm sorry, I don't understand the question.";
  };

  // Function to handle user messages
  const handleUserMessage = (message: string) => {
    if (!message.trim()) return; // Ignore empty messages
    setChatResponse((prevChatResponse: any) => {
      const botResponse = handleBotResponse(message);
      return [
        ...prevChatResponse,
        { message, isUser: true }, // User message
        { message: botResponse, isUser: false }, // Bot message
      ];
    });
  };

  return (
    <>
      {isOpenChatBot && (
        <div className="absolute top-[30%] right-0">
          <ChatButton onClick={() => setIsOpenChatBot(false)} />
        </div>
      )}
      <div className="flex-1 w-1/4 border border-black h-2/3 absolute bottom-4 rounded-xl right-4 bg-chatboxColor flex flex-col">
        <Header />
        <div className="w-full flex-1 px-4 py-4 gap-2 flex flex-col overflow-scroll no-scrollbar">
          {chatResponse.length > 0 ? (
            chatResponse.map((message, index) => {
              if (message.message) {
                return (
                  <Message
                    key={index}
                    isUser={message.isUser}
                    message={message.message}
                  />
                );
              }
            })
          ) : (
            <Message isUser={false} message="Good Day, How are you?" />
          )}
          <div ref={messagesEndRef} />
        </div>
        <ChatFooter onClick={handleUserMessage} />
      </div>
    </>
  );
};

export default ChatBot;

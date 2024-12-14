import { chatResponseAtom, isOpenChatBotAtom } from '@/store/store';
import { useAtom, useSetAtom } from 'jotai';
import { Delete, Ellipsis, Minus } from 'lucide-react';

const Header = () => {
  const [isChatbot, setIsChatbot] = useAtom(isOpenChatBotAtom);
  const setChatResponse = useSetAtom(chatResponseAtom);
  return (
    <div className="flex flex-row shadow-md gap-2 justify-items-start items-center  p-2">
      <div className="flex flex-row gap-2 flex-1">
        <img
          src="/doctor.png"
          alt="teeth image"
          style={{ width: '60px', height: '60px' }}
          className=" bg-primaryColor rounded-full"
        />
        <div className="">
          <p className="font-bold text-xl text-primaryColor">DR. Siyo Vallao</p>
          <p className="font-bold text-md text-white">SMILE SYNC Dentist</p>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div
          onClick={() => setChatResponse([])}
          className=" bg-[#BBCBE1]  rounded-full shadow-inner p-1"
        >
          <Delete size={16} />
        </div>
        <div className=" bg-[#BBCBE1]  rounded-full shadow-inner p-1">
          <Ellipsis size={16} />
        </div>
        <div className=" bg-[#BBCBE1]  rounded-full shadow-inner p-1">
          <Minus onClick={() => setIsChatbot(!isChatbot)} size={16} />
        </div>
      </div>
    </div>
  );
};

export default Header;

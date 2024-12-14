import { format } from 'date-fns'; // If you are using date-fns library

type UserCardProps = {
  avatar?: string;
  name?: string;
  email?: string;
  gender?: string;
  age?: string;
  contactNumber?: string;
  address?: string;
  birthdate?: string; // Assuming birthdate is in ISO string format from MongoDB
};

const UserCard = ({
  avatar = '',
  name = '',
  email = '',
  birthdate = '',
  gender = '',
  age = '',
  contactNumber = '',
  address = '',
}: UserCardProps) => {
  // Check if birthdate is provided and valid before formatting
  const formattedBirthdate = birthdate ? 
    format(new Date(birthdate), 'MM/dd/yyyy') : 'Not available'; // Add fallback if no birthdate

  return (
    <div className="flex flex-col pb-12 border-gray-500 h-full border rounded-2xl items-center">
      <div className="bg-primaryColor w-full rounded-t-full h-4" />
      <p className="py-4 px-4 w-full border-t-2 border-b-2 border-gray-500 text-xl font-bold">
        Patient Info
      </p>
      <div className="p-2 my-4 border-gray-500 border-2 rounded-full w-32 h-32">
        <img
          src={avatar ? avatar : '/teeth.png'}
          alt="teeth image"
          className="mx-auto bg-primaryColor w-full h-full rounded-full"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex flex-col justify-center mt-2 mb-8 items-center gap-2">
        <p className="text-3xl font-bold">{name}</p>
        <p>{email}</p>
      </div>
      <div className="w-full px-4">
        <div className="py-4 flex flex-row justify-between items-center px-4 w-full border-t-2 border-b-2 border-gray-500 text-xl">
          <p className="font-bold">Gender</p>
          <p>{gender}</p>
        </div>
        <div className="py-4 flex flex-row justify-between items-center px-4 w-full  border-b-2 border-gray-500 text-xl">
          <p className="font-bold">Age</p>
          <p>{age}</p>
        </div>
        <div className="py-4 flex flex-row justify-between items-center px-4 w-full  border-b-2 border-gray-500 text-xl">
          <p className="font-bold flex-1 w-full">Date of Birth</p>
          <p className=" w-1/2 text-right">{formattedBirthdate}</p>
        </div>
        <div className="py-4 flex flex-row justify-between items-center px-4 w-full  border-b-2 border-gray-500 text-xl">
          <p className="font-bold">Contact No.</p>
          <p>{contactNumber}</p>
        </div>
        <div className="py-4 flex flex-row justify-between items-center px-4 w-full  border-b-2 border-gray-500 text-xl">
          <p className="font-bold flex-1 w-full">Address</p>
          <p className=" w-1/2 text-right">{address}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

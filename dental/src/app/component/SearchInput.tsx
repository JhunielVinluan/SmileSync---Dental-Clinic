import { Search } from 'lucide-react';

type SearchInputProps = {
  setSearchQuery: (query: string) => void;
};
const SearchInput = ({ setSearchQuery }: SearchInputProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="flex flex-row gap-2 items-center h-12 border w-full px-2 border-gray-500 rounded-lg">
      <Search />
      <input
        type="input"
        className="bg-transparent focus:outline-none w-full "
        placeholder="Search..."
        onChange={handleSearchChange}
      />
    </div>
  );
};
export default SearchInput;

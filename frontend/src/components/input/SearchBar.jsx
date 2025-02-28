import { Search, X } from "lucide-react";
import { useState } from "react";

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    // TODO: api call to get notes
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        value={searchValue}
        placeholder="Search Notes"
        className="p-2 text-lg rounded-sm focus:outline-2 bg-gray-200"
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue ? (
        <X
          onClick={() => setSearchValue("")}
          className="absolute right-10 cursor-pointer text-gray-800"
        />
      ) : (
        ""
      )}
      <Search
        onClick={handleSearch}
        className="absolute right-3 cursor-pointer text-gray-800"
      />
    </div>
  );
};

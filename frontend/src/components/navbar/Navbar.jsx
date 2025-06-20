import { ProfileCard } from "../cards/ProfileCard";
import { SearchBar } from "../input/SearchBar";

export const Navbar = ({ userInfo, onSearchNote, handleSearchClear }) => {
  return (
    <nav className="flex justify-between items-center h-16 py-2 pl-8 text-2xl shadow-md">
      <h1 className="flex items-center justify-center font-bold text-center w-16">
        Notes
      </h1>
      <SearchBar
        onSearchNote={onSearchNote}
        handleSearchClear={handleSearchClear}
      />
      <ProfileCard userInfo={userInfo} />
    </nav>
  );
};

import { useNavigate } from "react-router-dom";
import { getInitials } from "../../utils/helper";

export const ProfileCard = () => {
  // TODO: get name from backend and use it as for the initials and name
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex mr-8">
      <p className="rounded-full bg-gray-400 mr-2 w-12 h-12 flex justify-center items-center">
        {getInitials("youcef doumi")}
      </p>
      <div>
        <h2 className="text-sm font-bold mt-2">Youcef Doumi</h2>
        <p
          className="underline text-sm text-center cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

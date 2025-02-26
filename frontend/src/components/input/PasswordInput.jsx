import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";

export const PasswordInput = ({ password, setPassword }) => {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <div className="relative">
      <input
        type={isShowing ? "text" : "password"}
        placeholder="password"
        className="border-[1.5px] border-gray-300 p-4 w-[28rem] shadow-sm outline-none rounded-md ml-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isShowing ? (
        <EyeOff
          className="absolute right-8 top-4.5 text-indigo-700 cursor-pointer hover:text-indigo-400 transition-[0.3s]"
          onClick={() => setIsShowing(false)}
        />
      ) : (
        <Eye
          className="absolute right-8 top-4.5 text-indigo-700 cursor-pointer hover:text-indigo-400 transition-[0.3s]"
          onClick={() => setIsShowing(true)}
        />
      )}
    </div>
  );
};

PasswordInput.propTypes = {
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};

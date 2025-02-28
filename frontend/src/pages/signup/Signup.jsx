import { useState } from "react";
import { Link } from "react-router-dom";
import { PasswordInput } from "../../components/input/PasswordInput";
import { helper } from "../../utils/helper";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("e");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    {
      !name ? setNameError("Please provide a name") : setNameError("");
    }
    {
      !helper(email)
        ? setEmailError("Please provide a valid email")
        : setEmailError("");
    }
    {
      password.length < 10
        ? setPasswordError(
            "Please provide a password of at least 10 characters"
          )
        : setPasswordError("");
    }

    // TODO: signup API call
  };

  return (
    <div className="flex flex-col justify-around mx-auto mt-12 h-[76vh] w-[30rem] border-[1.5px] border-gray-300 shadow-sm outline-none rounded-md">
      <form
        onSubmit={handleSignup}
        className="h-[90%] flex flex-col justify-around"
      >
        <h1 className="w-18 ml-4 mx-auto text-2xl">Login</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="border-[1.5px] border-gray-300 p-4 w-[28rem] shadow-sm outline-none rounded-md mb-2 ml-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError ? <p className="text-red-500 ml-6">{nameError}</p> : ""}
          <input
            type="text"
            placeholder="Email"
            className="border-[1.5px] border-gray-300 p-4 w-[28rem] shadow-sm outline-none rounded-md mb-2 ml-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError ? <p className="text-red-500 ml-6">{emailError}</p> : ""}
          <PasswordInput password={password} setPassword={setPassword} />
          {passwordError ? (
            <p className="text-red-500 ml-6">{passwordError}</p>
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="bg-indigo-500 h-12 cursor-pointer hover:bg-indigo-800 transition-[0.3s] ml-4 text-white text-center mx-auto w-[28rem] rounded-md"
        >
          Signup
        </button>
      </form>
      <p className="mx-auto h-[10%]">
        Already have an account?{" "}
        <span className="underline text-blue-500 ml-4 cursor-pointer hover:text-blue-800 transition-[0.3s]">
          <Link to="/login">Log in</Link>
        </span>
      </p>
    </div>
  );
};

import { Link, useNavigate } from "react-router-dom";
import { PasswordInput } from "../../components/input/PasswordInput";
import { useState } from "react";
import { helper } from "../../utils/helper";
import { axiosInstance } from "../../utils/axiosInstance";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!helper(email)) {
      setEmailError("Please enter a valid email adress");
      return;
    }
    if (!password) {
      setPasswordError("Please enter a valid password");
      return;
    }

    setEmailError("");

    // TODO: login API call
    try {
      const res = await axiosInstance.post("/login", {
        email,
        password,
      });
      console.log("req sent");
      console.log(res.data);

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setPasswordError(err.response.data.msg);
      } else {
        setPasswordError("Unexpected error happened");
      }
    }
  };

  return (
    <div className="flex flex-col justify-around mx-auto mt-12 h-[76vh] w-[30rem] border-[1.5px] border-gray-300 shadow-sm outline-none rounded-md">
      <form
        onSubmit={handleLogin}
        className="h-[90%] flex flex-col justify-around"
      >
        <h1 className="w-18 ml-4 mx-auto text-2xl">Login</h1>
        <div>
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
          Login
        </button>
      </form>
      <p className="mx-auto h-[10%]">
        Not registered yet?{" "}
        <span className="underline text-blue-500 ml-4 cursor-pointer hover:text-blue-800 transition-[0.3s]">
          <Link to="/signup">Create an Account</Link>
        </span>
      </p>
    </div>
  );
};

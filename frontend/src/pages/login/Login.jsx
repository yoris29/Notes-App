export const Login = () => {
  return (
    <div className="flex flex-col justify-around mx-auto mt-12 h-[76vh] w-[30rem] border-[1.5px] border-gray-300 shadow-sm outline-none rounded-md">
      <div className="h-[90%] flex flex-col justify-around">
        <h1 className="w-18 ml-4 mx-auto text-2xl">Login</h1>
        <input
          type="text"
          placeholder="Email"
          className="border-[1.5px] border-gray-300 p-4 w-[28rem] shadow-sm outline-none rounded-md ml-4"
        />
        <button className="bg-indigo-500 h-12 cursor-pointer hover:bg-indigo-800 transition-[0.3s] ml-4 text-white text-center mx-auto w-[28rem] rounded-md">
          Login
        </button>
      </div>
      <p className="mx-auto h-[10%]">
        Not registered yet?{" "}
        <span className="underline text-blue-500 ml-4 cursor-pointer hover:text-blue-800 transition-[0.3s]">
          Create an Account
        </span>
      </p>
    </div>
  );
};

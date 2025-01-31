import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(email, password);
    // API call to login
    const userdata = { email, password };
    try{
      const response = await axios.post("http://localhost:3000/login", userdata);
      console.log(response.data , " response data ");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    }catch(error){
      console.log("login failed fontend ",error);
    }
  };

  return (
    <>
      <div className="w-[500px] h-[600px] bg-slate-300 flex pt-40 flex-col gap-5 px-10">
        <h1>Login</h1>
        <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleSubmit}>submit</button>
        </form>
        <button
          type="button"
          className="bg-slate-300"
          onClick={() => navigate("/signup")}
        >
          Dont have an account
        </button>
      </div>
    </>
  );
};

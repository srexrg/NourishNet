/* eslint-disable no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
//   const {setAuthUser} = useAuthContext()
  const [loading, setLoading] = useState(false);

  const signup = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    const success = handleInput({
      username,
      email,
      password,
    });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user",JSON.stringify(data))
    //   setAuthUser(data);
      console.log(data)
    }  catch(e){
       toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInput({
    username,
    email,
    password
}: {
    username: string;
    email: string;
    password: string;
}) {
  if (!email || !username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }


  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}

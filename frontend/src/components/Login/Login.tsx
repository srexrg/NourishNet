import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import useLogin from "@/hooks/UseLogin";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useForm } from "react-hook-form";
import image from "@/assets/login.jpeg";
import { useTheme } from "@/components/theme-provider"; // Import useTheme hook

interface FormData {
  username: string;
  password: string;
}

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { loading, login } = useLogin();
  const { theme } = useTheme(); 

  const onSubmit = async (data: FormData) => {
    await login(data);
  };
  
  const inputClasses = theme === 'light' ? 'text-black bg-white dark:bg-gray-700' : '';
  const passwordClasses = theme === 'light' ? 'text-black bg-white dark:bg-gray-700' : '';

  return (
    <section className={`bg-[#111827] text-white min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'dark:border-b-slate-700 dark:bg-[#111827]' : ''}`}>
      <div className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-4">Login</h1>
            <p className="text-xl mb-8">Welcome Back!</p>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label
                  className="block text-sm font-medium mb-1"
                  placeholder="name"
                >
                  Username
                </Label>
                <Input
                  id="name"
                  className={inputClasses}
                  placeholder="John Doe"
                  {...register("username")}
                />
                {errors.username && (
                  <span className="text-red-500">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <Input
                  id="password"
                  className={passwordClasses}
                  placeholder="••••••••••"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button className="w-full">
                {loading ? (
                  <FaSpinner className="animate-spin"/>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
            <p className="text-sm text-gray-400 mt-6">
              Don't have an account? {""}
              <Link className="text-green-500 hover:underline" to="/signup">
                Sign Up
              </Link>
            </p>
          </div>
          <div>
            <img
              alt="People sharing food"
              className="rounded-lg"
              height="400"
              src={image}
              style={{
                // aspectRatio: "600/400",
                objectFit: "cover",
              }}
              width="600"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

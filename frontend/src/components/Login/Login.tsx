import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useLogin from "@/hooks/UseLogin";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useForm } from "react-hook-form";
import image from "@/assets/login.jpeg"

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

  const onSubmit = async (data: FormData) => {
    await login(data);
  };
  return (
    <section className="bg-[#111827] text-white min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-4">Login</h1>
            <p className="text-xl mb-8">
              Welcome Back!
            </p>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label
                  className="block text-sm font-medium mb-1"
                  placeholder="name"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
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
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Create Account"
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


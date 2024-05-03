import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";
import { ModeToggle } from "../mode-toggle";
import FoodList from "../FoodList";

export function HomeLanding() {
  const { logout } = useLogout();
  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
        <Link className="text-xl font-bold" to="/">
          NourishNet
        </Link>
        <nav className="flex items-center space-x-4">
          <Link className="hover:underline" to="/add">
            Add Food
          </Link>
          <Link className="hover:underline" to="/home/myfood">
            My Foods
          </Link>
          <Link className="hover:underline" to="/home/incoming">
            Incoming Requests
          </Link>
          <Link className="hover:underline" to="/home/myrequest">
            My Requests 
          </Link>
          <Button
            className="rounded-full"
            size="icon"
            variant="ghost"
            onClick={logout}
          >
            <LogOutIcon className="w-5 h-5" />
            <span className="sr-only">Logout</span>
          </Button>
          <ModeToggle />
        </nav>
      </header>
      <main>
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Share Your Surplus, Feed Your Community
            </h1>
            <p className="text-lg mb-8">
              Join our community and help reduce food waste by sharing your
              extra food with those in need.
            </p>
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md">
              <Link to="/add">Start Sharing</Link>
            </Button>
          </div>
        </section>
        <FoodList />
      </main>
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 FoodNet. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

function LogOutIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}


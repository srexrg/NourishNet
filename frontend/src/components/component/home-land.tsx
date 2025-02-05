import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import { ModeToggle } from "../mode-toggle";
import FoodList from "../FoodList";
// import { useTheme } from "../theme-provider";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function HomeLanding() {
  const { logout } = useLogout();
  // const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-slate-700 dark:bg-background">
        <div className="flex items-center justify-between px-4 py-3">
          <Link className="text-xl font-bold flex items-center" to="/">
            <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
              NourishNet
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link className="text-sm hover:text-primary transition-colors" to="/add">
              Add Food
            </Link>
            <Link className="text-sm hover:text-primary transition-colors" to="/home/myfood">
              My Foods
            </Link>
            <Link className="text-sm hover:text-primary transition-colors" to="/home/incoming">
              Incoming Requests
            </Link>
            <Link className="text-sm hover:text-primary transition-colors" to="/home/myrequest">
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

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden py-4 px-4 space-y-3 border-t dark:border-slate-700">
            <Link className="block text-sm hover:text-primary transition-colors" to="/add">
              Add Food
            </Link>
            <Link className="block text-sm hover:text-primary transition-colors" to="/home/myfood">
              My Foods
            </Link>
            <Link className="block text-sm hover:text-primary transition-colors" to="/home/incoming">
              Incoming Requests
            </Link>
            <Link className="block text-sm hover:text-primary transition-colors" to="/home/myrequest">
              My Requests
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                className="rounded-full"
                size="icon"
                variant="ghost"
                onClick={logout}
              >
                <LogOutIcon className="w-5 h-5" />
              </Button>
              <ModeToggle />
            </div>
          </nav>
        )}
      </header>

      <main>
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
          <div className="text-center lg:text-start space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
                Share Food,
              </span>{" "}
              Build Community
            </h1>
            <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
              Join our community and help reduce food waste by sharing your
              extra food with those in need.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4">
              <Link
                to="/add"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full md:w-1/3"
              >
                Start Sharing
              </Link>
              <a
                href="https://github.com/srexrg"
                target="_blank"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full md:w-1/3"
              >
                GitHub
                <GitHubLogoIcon className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        <FoodList />
      </main>

      <footer className="border-t dark:border-slate-700 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 NourishNet. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

function LogOutIcon(props: React.SVGProps<SVGSVGElement>) {
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

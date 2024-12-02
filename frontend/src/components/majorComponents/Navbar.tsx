import { Menu, X } from "lucide-react";
import { useState } from "react";
import darklogo from "../../assets/images/logos/darklogo.png";
import { navItems } from "@/constants";
import { ModeToggle } from "../theme/modeToggle";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const router = useNavigate();
  const toggleNavbar = () => setMobileDrawerOpen(!mobileDrawerOpen);

  // Check for token in localStorage
  const key = localStorage.getItem("token");

  function logout()
  {
    localStorage.removeItem("token") 
    window.location.reload();
  }

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
               
          <div className="flex items-center font-bold text-lg cursor-pointer" onClick={()=>router('/')}>
           GREEN PEDAL
          </div>
          </div>
          <ul className="hidden lg:flex space-x-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="hover:text-blue-500 transition duration-300">{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-8 items-center">
            {key?  <Button variant="myButton" onClick={logout}>Logout</Button>: (
              <>
                <Button variant="outline" onClick={() => router('/login')}>Sign In</Button>
                <Button variant="myButton" onClick={() => router('/signup')}>Create an account</Button>
              </>
            )}
            <ModeToggle />
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar} className="p-2">
              {mobileDrawerOpen ? (
                <X className="text-neutral-900 dark:text-white" />
              ) : (
                <Menu className="text-neutral-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 w-full p-8 flex flex-col justify-center items-center lg:hidden rounded-l-lg shadow-lg transition-transform duration-300 ease-in-out bg-neutral-100 dark:bg-neutral-900">
            <ul className="flex flex-col space-y-6">
              {navItems.map((item, index) => (
                <li key={index} className="w-full">
                  <a
                    href={item.href}
                    className="block text-center text-neutral-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-500 transition duration-300 rounded-lg py-2 px-4"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            {!key && (
              <div className="flex flex-col space-y-4 mt-6 w-full">
                <button
                  onClick={() => router('/login')}
                  className="py-2 text-center border border-neutral-300 dark:border-neutral-700 rounded-lg transition duration-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 w-full px-4 text-neutral-900 dark:text-white"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router('/signup')}
                  className="py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-800 w-full transition duration-300 hover:opacity-90 px-4 text-center text-black dark:text-white"
                >
                  Create an account
                </button>
              </div>
            )}
            <div className="flex justify-center mt-4">
              <ModeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
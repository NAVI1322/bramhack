import { Menu, X } from "lucide-react";
import { useState } from "react";
import darklogo from "@/assets/images/logos/darklogo.png";
import { navItems } from "@/constants"; // Assumes you have predefined navigation items
import { ModeToggle } from "@/components/theme/modeToggle";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const router = useNavigate();
  const toggleNavbar = () => setMobileDrawerOpen(!mobileDrawerOpen);
  const key = localStorage.getItem("token");

  return (
    <div>
      <nav className="sticky top-0 py-3 backdrop-blur-lg bg-black text-white">
        <div className="container mx-auto flex justify-between items-center px-4">
          
        <div className="flex items-center font-bold text-lg cursor-pointer" onClick={()=>router('/')}>
           GREEN PEDAL
          </div>

          
        

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!key && (
              <>
                <Button
                  variant="outline"
                  className="text-gray-300 hover:text-white border-gray-300 hover:border-white"
                  onClick={() => router("/login")}
                >
                  Sign In
                </Button>
                <Button
                  variant="myButton"
                  className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white"
                  onClick={() => router("/signup")}
                >
                  Create an account
                </Button>
              </>
            )}
            <ModeToggle />
          </div>
          </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleNavbar}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
          >
            {mobileDrawerOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
       

        {mobileDrawerOpen && (
          <div className="absolute top-14 left-0 w-full bg-black text-white shadow-lg">
            <div className="flex flex-col items-center py-4">
              {/* Navigation Links */}
              <ul className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-center text-gray-300 hover:text-white transition duration-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              {!key && (
                <div className="mt-4 w-full flex flex-col items-center space-y-3">
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-300 hover:text-white hover:border-white w-4/5"
                    onClick={() => router("/login")}
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="myButton"
                    className="bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-950 text-white w-4/5"
                    onClick={() => router("/signup")}
                  >
                    Create an account
                  </Button>
                </div>
              )}

              {/* Mode Toggle */}
              <div className="mt-4">
                <ModeToggle />
              </div>
            </div>
          </div>
        )}
     

      <Separator />
    </div>
  );
};

export default Navbar;
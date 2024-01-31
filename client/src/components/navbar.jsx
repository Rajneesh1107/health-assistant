import React from "react";
import { Menu, X } from "lucide-react";
import { Navigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo1.png";
const menuItems = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "About",
    to: "/about-us",
  },
  {
    name: "Contact",
    to: "/contact-us",
  },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignUp = () => {
    <Navigate to={"/sign-up"} replace={true} />;
  };

  const handleLogin = () => {
    <Navigate to={"/login"} replace={true} />;
  };

  return (
    <div
      className="relative w-full bg-rose-700"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "1",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <img src={logo} width={"50px"} alt="" />
          </span>
          <span className="font-bold">
            <h1 className=" font-extrabold text-white">Health Assistant</h1>
          </span>
        </div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <RouterLink
                  to={item.to}
                  className="rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:border-solid hover:border hover:border-white text-white"
                >
                  {item.name}
                </RouterLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden space-x-2 lg:block">
          <button
            type="button"
            className="rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:border-solid hover:border hover:border-white text-white"
            onClick={() => handleSignUp} //Route to SignUp page
          >
            <RouterLink className="font-bold text-white" to={"/sign-up"}>
              Sign-Up
            </RouterLink>
          </button>
          <button
            type="button"
            className="rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:border-solid hover:border hover:border-white text-white"
            onClick={() => handleLogin}
          >
            <RouterLink to={"/login"} className="font-bold ">
              Login
            </RouterLink>
          </button>
        </div>
        <div className="lg:hidden">
          <Menu
            onClick={toggleMenu}
            className="h-6 w-6 cursor-pointer text-white"
          />
        </div>

        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-rose-700 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span></span>
                    <span className="font-bold text-white">
                      Health Assistant
                    </span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-rose-500 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <RouterLink
                        key={item.name}
                        to={item.to}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-bold hover:bg-rose-500"
                      >
                        <span className="ml-3 text-base font-medium text-white">
                          {item.name}
                        </span>
                      </RouterLink>
                    ))}
                  </nav>
                </div>
                <br />
                <div className="mt-2 space-y-2">
                  <button
                    type="button"
                    className="w-full rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <RouterLink to={"/sign-up"}>Sign-Up</RouterLink>
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-md bg-rose-700 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black  border-solid border-2 border-white text-white"
                  >
                    <RouterLink to={"/login"}>Login</RouterLink>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

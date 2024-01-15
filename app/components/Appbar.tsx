import { Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import SigninButton from "./SigninButton";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/20/solid";

const Appbar = () => {
  return (
    <Navbar isBordered>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem className="flex gap-4 p-10">
          <Link className="text-gray-800 hover:text-sky-400" href={"/"}>
            Home
          </Link>
          <Link className="text-gray-800 hover:text-sky-400" href={"/profile"}>
            User Profile
          </Link>
          <Link className="text-gray-800 hover:text-sky-400" href={"/admin"}>
            Admin Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <SigninButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Appbar;
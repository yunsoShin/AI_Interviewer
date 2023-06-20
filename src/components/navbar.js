import React from "react";
import { useAIProcess, useAuthContext } from "@/pages/_app";
import Button from "./ui/Button";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { user, login, logout } = useAuthContext();
  const { setContent, setPrompt } = useAIProcess();
  return (
    <nav className="flex justify-between items-center py-2 pl-6 md:py-6 bg-white shadow mb-3">
      <Link href="/">
        <button
          className="text-xl font-bold text-gray-800  scale-150"
          onClick={() => {
            setContent();
            setPrompt(null);
          }}
        >
          <FontAwesomeIcon className="md:scale-125" icon={faMicrochip} />
        </button>
      </Link>
      <div className="flex items-center ">
        {user && (
          <Link href="/mybox">
            <Button className="mr-4" text={"Mybox"} />
          </Link>
        )}
        {!user && <Button text={"Login"} onClick={login} />}
        {user && <Button text={"Logout"} onClick={logout} />}
      </div>
    </nav>
  );
}

export default Navbar;

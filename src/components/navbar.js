import React from "react";
import { useAuthContext } from "@/pages/_app";
import Button from "./ui/Button";
import Link from "next/link";
function Navbar(props) {
  const { user, login, logout } = useAuthContext();
  return (
    <div className="flex p-4 justify-end">
      <div className="px-3">
        {user && (
          <Link href="/mybox">
            <Button text={"보관함"} />
          </Link>
        )}
      </div>
      <div className="">
        {!user && <Button text={"Login"} onClick={login} />}
        {user && <Button text={"Logout"} onClick={logout} />}
      </div>
    </div>
  );
}

export default Navbar;

import React from "react";
import { useAuthContext } from "@/pages/_app";
import Button from "./ui/Button";
function Navbar(props) {
  const { user, login, logout } = useAuthContext();
  return (
    <div>
      {!user && <Button text={"Login"} onClick={login} />}
      {user && <Button text={"Logout"} onClick={logout} />}
    </div>
  );
}

export default Navbar;

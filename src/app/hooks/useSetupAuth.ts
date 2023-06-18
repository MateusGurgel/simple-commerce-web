import { useEffect } from "react";
import { useUserState } from "../redux/user";
import { setApiToken } from "../api";

export default function () {
  const { user } = useUserState();

  useEffect(() => {
    if (user) {
      setApiToken(user.token);
    }
  }, []);
}

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserState } from "../redux/user";
import { api, setApiToken } from "../api";

export default function () {
  const router = useRouter();
  const userState = useUserState();

  useEffect(() => {
    if (!userState.user) {
      router.back();
      return;
    }

    console.log(userState.user.token);

    setApiToken(userState.user.token);
  }, []);
}

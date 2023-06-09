import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserState } from "../redux/user";
import { api, setApiToken } from "../api";

export default function () {
  const router = useRouter();
  const { user } = useUserState();

  useEffect(() => {
    if (!user) {
      router.back();
      return;
    }

    setApiToken(user.token);
  }, []);
}

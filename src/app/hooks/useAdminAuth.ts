import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserState } from "../redux/user";
import { api, setApiToken } from "../api";

export default function () {
  const router = useRouter();
  const { user } = useUserState();

  useEffect(() => {
    if (!user || !user.is_admin) {
      router.back();
      return;
    }

    setApiToken(user.token);
  }, []);
}

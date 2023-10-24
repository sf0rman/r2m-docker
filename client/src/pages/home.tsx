import { useEffect, useState } from "react";
import Navigation from "../elements/navigation/navigation";
import { useCookies } from "../provider/cookie-provider";
import useApi from "../hooks/useApi";

interface UserDto {
  _id: string;
  username: string;
}

export default function Home() {
  const cookie = useCookies();
  const api = useApi();
  const [user, setUser] = useState<UserDto | undefined>(undefined);

  const getUser = async () => {
    const user = await api.get("me");
    if (!user.data) {
      cookie.clearCookies();
    }

    setUser(user.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="home-container">
      <Navigation username={user?.username || ""} />
    </div>
  );
}

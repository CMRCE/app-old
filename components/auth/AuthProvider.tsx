import * as React from "react";
import * as apiClient from "../../lib/api";
import cookies from "js-cookie";
import { User } from "../../types";
import { useRouter } from "next/router";
import AuthRoute from "./AuthRoute";

type LoginFunc = (params: { email: string; password: string }) => Promise<void>;

type AuthContextType = {
  loading: boolean;
  isLoggedIn: boolean;
  login: LoginFunc;
  logout: () => void;
  user?: User;
};

export const AuthContext = React.createContext<AuthContextType>({
  loading: true,
  isLoggedIn: false,
  login: () => Promise.resolve(),
  logout: () => {},
});

export const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<User>();
  const router = useRouter();

  const login: LoginFunc = async ({ email, password }) => {
    const response = await apiClient.post("login", {
      email,
      password,
    });
    if (response?.status === "error") {
      // TODO: Clean up exception throwing
      throw { messages: response?.errors };
    }
    if (response?.status === "success") {
      const { token, ...user } = response.data;
      cookies.set("ourshop_token", token, { expires: 14 });
      setUser(user);
      setLoading(false);
    }
  };

  const logout = () => {
    cookies.remove("ourshop_token");
    setUser(undefined);
  };

  React.useEffect(() => {
    (async () => {
      const token = cookies.get("ourshop_token");
      if (!token) {
        await router.push("/auth/login");
        return;
      }
      if (user) return;
      const fetchedUser = await apiClient.get("user", token);
      if (fetchedUser.status === "error") {
        cookies.remove("ourshop_token");
        await router.push("/auth/login");
        return;
      }
      setUser(fetchedUser.data);
      setLoading(false);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (!user && !loading) {
        await router.push("/auth/login");
        return;
      }
      if (user) await router.push("/");
    })();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        isLoggedIn: !!user,
        login,
        logout,
        user,
      }}
    >
      <AuthRoute>{children}</AuthRoute>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

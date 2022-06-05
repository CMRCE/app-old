import * as React from "react";
import * as apiClient from "../../lib/api";
import cookies from "js-cookie";
import { User } from "../../types";
import { useRouter } from "next/router";
import AuthRoute, { allowUnauthenticatedAccess } from "./AuthRoute";

type LoginFunc = (params: {
  email: string;
  password: string;
  redirect?: string;
}) => Promise<void>;

export type SignUpParams = {
  first_name: string;
  last_name: string;
  email: string;
  dialing_code: string;
  mobile: string;
  password: string;
};
type SignUpFunc = (params: SignUpParams) => Promise<void>;

type AuthContextType = {
  loading: boolean;
  isLoggedIn: boolean;
  login: LoginFunc;
  logout: () => void;
  signup: SignUpFunc;
  user?: User;
};

export const AuthContext = React.createContext<AuthContextType>({
  loading: true,
  isLoggedIn: false,
  login: () => Promise.resolve(),
  logout: () => {},
  signup: () => Promise.resolve(),
});

export const useAuth = () => React.useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<User>();
  const router = useRouter();

  const login: LoginFunc = async ({ email, password, redirect }) => {
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
      cookies.set("ourshop_token", token, { expires: 1 });
      setUser(user);
      setLoading(false);
      await router.push(redirect ?? "/");
    }
  };

  const logout = () => {
    cookies.remove("ourshop_token");
    setUser(undefined);
  };

  const signup: SignUpFunc = async ({
    first_name,
    last_name,
    email,
    dialing_code,
    mobile,
    password,
  }) => {
    const response = await apiClient.post("register", {
      first_name,
      last_name,
      email,
      dialing_code,
      mobile,
      password,
    });
    if (response?.status === "error") {
      // TODO: Clean up exception throwing
      throw { messages: response?.errors };
    }
    if (response?.status === "success") {
      const { token, ...user } = response.data;
      cookies.set("ourshop_token", token, { expires: 1 });
      setUser(user);
      setLoading(false);
      await router.push("/");
    }
  };

  React.useEffect(() => {
    (async () => {
      const token = cookies.get("ourshop_token");
      if (!token && !allowUnauthenticatedAccess(router.pathname)) {
        await router.push({
          pathname: "/auth/login",
          query: `redirect=${router.pathname}`,
        });
        return;
      }
      if (user || allowUnauthenticatedAccess(router.pathname)) return;
      const fetchedUser = await apiClient.get("user", token);
      if (fetchedUser.status === "error") {
        cookies.remove("ourshop_token");
        await router.push("/auth/login");
        return;
      }
      setUser(fetchedUser.data);
      setLoading(false);
    })();
  }, [user, router]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        isLoggedIn: !!user,
        login,
        logout,
        signup,
        user,
      }}
    >
      <AuthRoute>{children}</AuthRoute>
    </AuthContext.Provider>
  );
};

export default AuthProvider;

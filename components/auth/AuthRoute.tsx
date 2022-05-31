import * as React from "react";
import { useRouter } from "next/router";
import { useAuth } from "./AuthProvider";

const UNAUTHENTICATED_PATHS = ["/auth/"];

export default function AuthRoute({ children }: { children: React.ReactNode }) {
  const { loading, isLoggedIn } = useAuth();
  const { pathname, push } = useRouter();

  React.useEffect(() => {
    if (loading || isLoggedIn) return;
    const isUnauthenticatedPath = UNAUTHENTICATED_PATHS.some((uPath) =>
      pathname.includes(uPath)
    );
    if (!isUnauthenticatedPath) {
      push("/auth/login");
    }
  }, [pathname, isLoggedIn, loading, push]);

  return <>{children}</>;
}

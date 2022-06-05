import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/ui/layout/Header";
import Footer from "../components/ui/layout/Footer";
import AuthProvider from "../components/auth/AuthProvider";
import BusinessProvider from "../components/business/BusinessProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <BusinessProvider>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
        </div>
      </BusinessProvider>
    </AuthProvider>
  );
}

export default MyApp;

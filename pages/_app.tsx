import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/ui/layout/Header";
import Footer from "../components/ui/layout/Footer";
import AuthProvider from "../components/auth/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {/* <Header /> */}
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        {/* <Footer /> */}
      </div>
    </AuthProvider>
  );
}

export default MyApp;

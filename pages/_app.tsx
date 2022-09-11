import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthProvider from "../components/auth/AuthProvider";
import BusinessProvider from "../components/business/BusinessProvider";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthProvider>
        <BusinessProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">
              <Component {...pageProps} />
            </main>
          </div>
        </BusinessProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;

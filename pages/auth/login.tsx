import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import LoginForm from "../../components/auth/LoginForm";
import authImg from "../../components/ui/images/auth.svg";

const Login: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <section className="h-full md:flex items-center">
        <div className="bg-white p-6 md:w-1/3 h-full">
          <h2 className="text-2xl font-bold mb-4">Sign in</h2>
          <LoginForm />
          <p>
            Don't have an account?{" "}
            <a className="font-semibold" href="/auth/signup">
              Sign up here
            </a>
          </p>
        </div>
        <div className="hidden md:block md:w-2/3 p-12">
          <Image src={authImg} className="opacity-70 mx-auto" alt="Welcome" />
        </div>
      </section>
    </div>
  );
};

export default Login;
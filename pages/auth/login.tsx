import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "components/auth/LoginForm";
import authImg from "components/ui/images/auth.svg";
import Card from "components/ui/layout/Card";

const Login: NextPage = () => {
  return (
    <div className="bg-brand-yellow-light bg-opacity-60 h-screen">
      <Head>
        <title>Login</title>
      </Head>
      <section className="h-full md:flex items-center">
        <Card className="p-6 lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4">Sign in</h2>
          <LoginForm />
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup">
              <a className="font-semibold">Sign up here</a>
            </Link>
          </p>
        </Card>
        <div className="hidden md:block md:w-2/3 p-12">
          <Image src={authImg} className="opacity-70 mx-auto" alt="Welcome" />
        </div>
      </section>
    </div>
  );
};

export default Login;

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "../../components/auth/SignUpForm";
import welcomeImg from "../../components/ui/images/welcome.svg";
import * as apiClient from "../../lib/api";
import { Country } from "../../types";

const SignUp: NextPage<{ countries: Array<Country> }> = ({ countries }) => {
  return (
    <div>
      <Head>
        <title>Sign Up</title>
      </Head>
      <section className="h-full md:flex items-center">
        <div className="bg-white p-6 md:w-1/3 h-full">
          <h2 className="text-2xl font-bold mb-4">Sign up</h2>
          <SignUpForm countries={countries} />
          <p>
            Already have an account?{" "}
            <Link href="/auth/login">
              <a className="font-semibold">Sign in here</a>
            </Link>
          </p>
        </div>
        <div className="hidden md:block md:w-2/3 p-12">
          <Image
            src={welcomeImg}
            className="opacity-70 mx-auto"
            alt="Welcome"
          />
        </div>
      </section>
    </div>
  );
};

export async function getStaticProps() {
  const response = await apiClient.get("select/countries");
  let countries: Array<Country> = [];
  if (response?.status === "success") {
    countries = response.data;
  }

  return {
    props: { countries },
  };
}

export default SignUp;

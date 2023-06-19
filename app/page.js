"use client";
import Feed from "@/components/Feed";
import { useSession } from "next-auth/react";
const Home = () => {
  const { data: session, status } = useSession();
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center ml-3 md:ml-0">
          AI-Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      {status === "authenticated" && <Feed />}
    </section>
  );
};

export default Home;

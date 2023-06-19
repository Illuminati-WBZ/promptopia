import User from "@/models/user";
import { ConnectToDB } from "@/utils/database";
import NextAuth from "next-auth/next";
import GithubProviders from "next-auth/providers/github";

// Instead of including the session() and signIn() functions directly in the callbacks object, you can follow this approach:

// Call the connectToDB() function as a pure function and place it at the top of your file. This will ensure that the database connection is established before any authentication-related operations are performed.

// Remove the await keyword before the connectToDB() function call, as it should be called synchronously.

// establish database connection
ConnectToDB();
const handler = NextAuth({
  providers: [
    GithubProviders({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      console.log(profile);
      try {
        // if user is not present then create
        const checkUser = await User.findOne({ email: profile.email });
        if (!checkUser) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.avatar_url,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }) {
      console.log("User : ", session.user.name);
      await ConnectToDB();
      const sessionId = await User.findOne({ email: session.user.email });
      if (sessionId) session.user.id = sessionId?._id.toString();
      return session;
    },
  },
});

export { handler as GET, handler as POST };

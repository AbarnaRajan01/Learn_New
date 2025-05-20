import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || "Ov23lity0PR6HNcorjlf",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "d03d9d4c3babcf55a61f1c174da828e9b9b2ba73",
    }),
  ],
});

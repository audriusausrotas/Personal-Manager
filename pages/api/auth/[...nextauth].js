import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDatabase, getUser } from "../../../lib/db-util";
import { verifyPassword } from "../../../lib/auth";

let client;

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          client = await connectDatabase();
          console.log("Connected successfully to server");
        } catch {
          console.log("Error connecting to database");
        }

        const user = await getUser(client, "users", credentials.username);
        if (user) {
          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (isValid) {
            return { username: user.username };
          } else {
            throw new Error("Wrong password");
          }
        } else {
          throw new Error("User not found");
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.username = token.username;
      }
      return session;
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
};

export default NextAuth(authOptions);

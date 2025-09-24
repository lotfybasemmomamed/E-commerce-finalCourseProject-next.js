import NextAuth, { NextAuthOptions,User  } from "next-auth";
import axios from "axios";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) return null;

        try {
          const { data } = await axios.post(`${process.env.API}/auth/signin`, {
            email: credentials.email,
            password: credentials.password,
          });

          const { user, token, message } = data;

          if (message === "success" && user && token) {
            const decode = JSON.parse(
              Buffer.from(token.split(".")[1], "base64").toString()
            );
            return {
              token: token,
              id: decode.id,
              user: {
                name: user.name,
                email: user.email,
                role: user.role,
              },
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as {
        role?: string;
        name: string;
        email: string;
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

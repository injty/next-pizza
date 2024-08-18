import { UserRole } from ".prisma/client";
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  callbacks: {
    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (findUser) {
        token.email = findUser.email;
        token.id = String(findUser.id);
        token.name = findUser.fullname;
        token.role = findUser.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async signIn({ account, user }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }
        if (!user.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [{ provider: account?.provider, providerId: account?.providerAccountId }, { email: user.email }],
          },
        });

        if (findUser) {
          await prisma.user.update({
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
            where: {
              id: findUser.id,
            },
          });

          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullname: user.name || "User #" + user.id,
            password: hashSync(user.id.toString(), 10),
            provider: account?.provider,
            providerId: account?.providerAccountId,
            verified: new Date(),
          },
        });
        return true;
      } catch (error) {
        console.log("[ROUTE ERROR]:", error);
        return false;
      }
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      profile(profile) {
        return {
          email: profile.email,
          id: profile.id,
          image: profile.avatar_url,
          name: profile.name || profile.login,
          role: "USER" as UserRole,
        };
      },
    }),
    CredentialsProvider({
      async authorize(credentials: any) {
        if (!credentials) return null;

        const values = {
          email: credentials.email,
        };
        const findUser = await prisma.user.findFirst({
          where: values,
        });
        if (!findUser) return null;

        const isPasswordValid = await compare(credentials.password, findUser.password);
        if (!isPasswordValid) return null;
        if (!findUser) return null;
        return {
          email: findUser.email,
          id: findUser.id,
          name: findUser.fullname,
          role: findUser.role,
        };
      },
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      name: "Credentials",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "@/lib/zod";
import { compareSync } from "bcrypt-ts";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("No user found");
        }

        const passwordMatch = compareSync(password, user.password);

        if (!passwordMatch) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const ProtectedRoutes = [
        "/admin",
        "/users",
        "/list-transaksi",
        "/home",
        "/thankyou",
        "/history-transaksi",
        "discounts",
        "games",
        "/profile",
        "/edit-photo"
      ];
      const adminRoutes = [
        "/admin",
        "/list-transaksi",
        "users",
        "discounts",
        "games",
      ];
      const isAdmin = auth?.user?.role === "admin";

      if (!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/", nextUrl));
      }

      if (!isAdmin && adminRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/", nextUrl));
      }

      const LoggedInProtectedRoutes = ["/login", "/register", "/"];
      if (isLoggedIn && LoggedInProtectedRoutes.includes(nextUrl.pathname)) {
        if (!isAdmin) return Response.redirect(new URL("/home", nextUrl));
        return Response.redirect(new URL("/admin", nextUrl));
      }

      return true;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
      }

      if (trigger == "update" && session) {
        token.name = session.name;
        token.email = session.email;
        token.role = session.role;
      }
      return token;
    },
    session({session,token}){
      session.user.id = token.sub as string
      session.user.role = token.role as string
      session.user.name = token.name as string
      session.user.email = token.email as string

      return session
    }
  },
});

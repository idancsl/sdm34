import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) throw new Error("Isi semua field");

        const admin = await prisma.admin.findUnique({
          where: { username: credentials.username },
        });

        if (!admin) throw new Error("Admin tidak ditemukan");

        const isValid = await bcrypt.compare(credentials.password, admin.password);
        if (!isValid) throw new Error("Password salah");

        return { id: admin.id, name: admin.name, username: admin.username };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: { signIn: "/admin/login", error: "/admin/login" },
});

export { handler as GET, handler as POST };

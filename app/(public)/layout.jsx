"use client"; // Wajib kalau pakai useSession / state / context

import { SessionProvider } from "next-auth/react";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

export default function PublicLayout({ children }) {
  return (
    <SessionProvider>
      <Navbar/>

      <main>{children}</main>
      
    </SessionProvider>
  );
}

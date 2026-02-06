"use client";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { SessionProvider } from "next-auth/react";

export default function PublicLayout({ children }) {
  return (
    <>
     <SessionProvider>
        <Navbar />
        {children}
        <Footer />
      </SessionProvider>
      </>
  );
}

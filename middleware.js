import { withAuth } from "next-auth/middleware";

export default withAuth(
  // Options
  {
    pages: {
      signIn: "/admin/login", // redirect ke halaman login jika tidak ada session
    },
    // Optional: callback untuk memfilter role
    callbacks: {
      authorized: ({ token }) => {
        // Jika mau batasi hanya admin:
        return !!token; // bisa ganti: token.role === 'admin'
      },
    },
  }
);

// Matcher untuk semua route admin dashboard
export const config = {
  matcher: ["/admin/dashboard/:path*"],
};

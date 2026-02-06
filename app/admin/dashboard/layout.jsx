"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminLayout({ children, active }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Dummy data session admin
  const admin = { name: "Admin", avatar: "/img/admin-avatar.jpg" };

  const menu = [
    { href: "/admin/dashboard", label: "Dashboard", icon: "🏠" },
    { href: "/admin/dashboard/guru", label: "Guru", icon: "👩‍🏫" },
    { href: "/admin/dashboard/pendaftar", label: "Pendaftar", icon: "📝" },
    { href: "/admin/dashboard/prestasi", label: "Prestasi", icon: "🏆" },
    { href: "/admin/dashboard/eskul", label: "Eskul", icon: "🎨" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed z-20 inset-y-0 left-0 w-64 bg-purple-600 text-white p-6 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <h1 className="text-2xl font-bold mb-8 text-white">🎉 Admin Panel</h1>

        <nav className="space-y-4">
          {menu.map((m) => (
            <Link key={m.href} href={m.href}>
              <div className={`flex items-center gap-3 p-2 rounded hover:bg-purple-500 cursor-pointer font-semibold ${active === m.href ? "bg-purple-700" : ""}`}>
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Konten utama */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Navbar atas */}
        <header className="flex justify-between items-center p-4 bg-white shadow-sm border-b">
          {/* Kiri: tombol sidebar */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-purple-600 font-bold"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <span className="font-bold text-purple-600 text-lg">Dashboard</span>
          </div>

          {/* Kanan: nama admin + avatar */}
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700">{admin.name}</span>
            <Avatar>
              <AvatarImage src={admin.avatar} alt={admin.name} />
              <AvatarFallback>{admin.name[0]}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Children / page content */}
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

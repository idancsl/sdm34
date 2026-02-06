"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [dataDashboard, setDataDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Proteksi halaman: redirect ke login jika tidak ada session
  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  // Fetch dashboard data
  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/dashboard-data");
        const data = await res.json();

        // Pastikan field dari API sesuai dengan state
        setDataDashboard({
          guruLaki: data.guru.L,
          guruPerempuan: data.guru.P,
          pendaftarLaki: data.pendaftar.L,
          pendaftarPerempuan: data.pendaftar.P,
        });
      } catch (err) {
        console.error("Gagal fetch dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="w-12 h-12 text-green-500" />
      </div>
    );
  }

  if (!dataDashboard) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Gagal memuat data dashboard.</p>
      </div>
    );
  }

  // DATA CHART
  const chartData = {
    labels: ["Guru Laki-laki", "Guru Perempuan", "Pendaftar Laki-laki", "Pendaftar Perempuan"],
    datasets: [
      {
        label: "Jumlah",
        data: [
          dataDashboard.guruLaki,
          dataDashboard.guruPerempuan,
          dataDashboard.pendaftarLaki,
          dataDashboard.pendaftarPerempuan,
        ],
        backgroundColor: ["#3b82f6", "#ec4899", "#3b82f6", "#ec4899"],
      },
    ],
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-green-600">Admin Dashboard</h1>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Guru Laki-laki</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dataDashboard.guruLaki}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guru Perempuan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dataDashboard.guruPerempuan}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pendaftar Laki-laki</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dataDashboard.pendaftarLaki}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pendaftar Perempuan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{dataDashboard.pendaftarPerempuan}</p>
          </CardContent>
        </Card>
      </div>

      {/* CHART */}
      <Card>
        <CardHeader>
          <CardTitle>Statistik Berdasarkan Jenis Kelamin</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

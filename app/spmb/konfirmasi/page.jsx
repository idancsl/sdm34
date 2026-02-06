"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Upload from "@/components/ui/upload";
import { toast, Toaster } from "react-hot-toast";

export default function Konfirmasi() {
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [bukti, setBukti] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem("spmbFormData");
    if (!data) return router.push("/spmb/daftar");
    setFormData(JSON.parse(data));
  }, [router]);

  const handleSubmit = async () => {
    if (!bukti) {
      toast.error("Harap upload bukti pembayaran!", {
        duration: 4000,
        style: { minWidth: "300px", textAlign: "center", fontSize: "16px" },
      });
      return;
    }

    if (!confirm("Apakah Anda yakin ingin mendaftar?")) return;

    const data = new FormData();
    for (let key in formData) {
      if (formData[key] instanceof File) {
        data.append(key, formData[key]);
      } else {
        data.append(key, formData[key]);
      }
    }
    data.append("buktiPembayaran", bukti);

    try {
      const res = await fetch("/api/spmb/submit", { method: "POST", body: data });
      const result = await res.json();

      if (result.success) {
        toast.success("Pendaftaran berhasil! Mengarahkan ke halaman selesai...", {
          duration: 3000,
          style: { minWidth: "300px", textAlign: "center", fontSize: "16px" },
        });

        sessionStorage.removeItem("spmbFormData");

        setTimeout(() => {
          router.push("/spmb/selesai"); // diarahkan ke halaman selesai
        }, 1500);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat submit. Coba lagi.", {
        duration: 4000,
        style: { minWidth: "300px", textAlign: "center", fontSize: "16px" },
      });
      console.error(error);
    }
  };

  if (!formData) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 space-y-8">
      <Toaster />
      <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
        Konfirmasi & Upload Bukti Pembayaran
      </h1>

      <div className="space-y-4">
        <Upload label="Bukti Pembayaran" onFileChange={setBukti} />
        <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 w-full">
          Submit Pendaftaran
        </Button>
      </div>
    </div>
  );
}

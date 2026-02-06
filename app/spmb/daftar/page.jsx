"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UploadCloud, CreditCard } from "lucide-react";

export default function DaftarPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const res = await fetch("/api/spmb/submit", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("🎉 Pendaftaran berhasil dikirim!");
      e.target.reset();
    } else {
      alert("❌ Gagal mengirim data");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-4 flex justify-center">
      <div className="w-full max-w-2xl space-y-6">
        <Card className="rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-green-600">
              Formulir Pendaftaran SPMB
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Lengkapi data & dokumen pendaftaran
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <Input name="nama" placeholder="Nama Lengkap" required />
              <Input name="tempatLahir" placeholder="Tempat Lahir" required />
              <Input type="date" name="tanggalLahir" required />

              {/* SELECT JENIS KELAMIN */}
              <div className="grid gap-1">
                <Label className="text-sm">Jenis Kelamin</Label>
                <select name="jenisKelamin" required className="input input-bordered w-full">
                  <option value="">-- Pilih Jenis Kelamin --</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <Input name="namaAyah" placeholder="Nama Ayah" required />
              <Input name="namaIbu" placeholder="Nama Ibu" required />
              <Input name="hp" placeholder="No HP / WhatsApp" required />
              <Input name="alamat" placeholder="Alamat Lengkap" required />

              {/* UPLOAD DOKUMEN */}
              {[
                ["pasFoto", "Pas Foto"],
                ["akte", "Akte Kelahiran"],
                ["kk", "Kartu Keluarga"],
                ["ijazah", "Ijazah / Surat Keterangan"],
              ].map(([name, label]) => (
                <div key={name} className="grid gap-1">
                  <Label className="flex items-center gap-2 text-sm">
                    <UploadCloud size={16} /> {label}
                  </Label>
                  <Input type="file" name={name} required />
                </div>
              ))}

              {/* INFO PEMBAYARAN */}
              <Card className="rounded-xl border-green-200 bg-green-50/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700 text-lg">
                    <CreditCard size={18} />
                    Informasi Pembayaran
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                  <p>
                    <strong>Biaya Pendaftaran:</strong>{" "}
                    <span className="text-green-700 font-semibold">Rp 500.000</span>
                  </p>
                  <div className="rounded-xl bg-white p-4 shadow-sm space-y-1">
                    <p><strong>Bank:</strong> BSI</p>
                    <p><strong>No Rekening:</strong> 7123 01 000000 123</p>
                    <p><strong>Atas Nama:</strong> SD Muhammadiyah 34 Cikupa</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    * Transfer terlebih dahulu sebelum upload bukti pembayaran
                  </p>
                </CardContent>
              </Card>

              {/* UPLOAD BUKTI PEMBAYARAN */}
              <div className="grid gap-1">
                <Label className="flex items-center gap-2 text-sm">
                  <UploadCloud size={16} /> Bukti Pembayaran
                </Label>
                <Input type="file" name="buktiPembayaran" required />
              </div>

              <Button
                disabled={loading}
                className="rounded-xl bg-green-600 hover:bg-green-700"
              >
                {loading ? "Mengirim..." : "Submit Pendaftaran"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

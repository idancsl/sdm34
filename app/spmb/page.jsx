"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Spmb() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      
      {/* Identitas Sekolah + Brosur + Biaya */}
      <section className="grid md:grid-cols-3 gap-6 items-start">
        {/* Identitas Sekolah */}
        <div className="flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0">
            <Image
              src="/img/tes.png"
              alt="Logo Sekolah"
              fill
              className="rounded-full object-cover shadow-lg"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-green-500">SD Muhammadiyah 34 Cikupa</h1>
          <p className="text-gray-600 font-medium">Tahun Ajaran: 2025/2026</p>
          <p className="text-gray-700">Visi: Menjadi sekolah unggul berkarakter & kreatif.</p>
          <p className="text-gray-700">Misi: Mendidik generasi kreatif, berakhlak mulia, siap digital era.</p>
        </div>

        {/* Brosur */}
        <Card className="bg-gradient-to-tr from-pink-50 via-green-50 to-blue-50 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform rounded-xl">
          <CardHeader>
            <CardTitle className="text-green-600 text-lg md:text-xl font-bold">Brosur Pendaftaran</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-full h-48 md:h-56 mb-4">
              <Image
                src="/img/brosur-spmb.png"
                alt="Brosur SPMB"
                fill
                className="rounded-xl object-cover shadow-md"
              />
            </div>
            <p className="text-gray-700 text-center mb-4">Unduh brosur untuk info lengkap.</p>
            <Button className="bg-green-500 hover:bg-green-600 text-white w-full md:w-auto px-6 py-2 font-semibold transition-all">
              Unduh Brosur
            </Button>
          </CardContent>
        </Card>

        {/* Biaya Masuk */}
        <Card className="bg-gradient-to-tr from-yellow-50 via-orange-50 to-pink-50 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform rounded-xl">
          <CardHeader>
            <CardTitle className="text-green-600 text-lg md:text-xl font-bold">Biaya Masuk</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-full h-48 md:h-56 mb-4">
              <Image
                src="/img/biaya-masuk.png"
                alt="Biaya Masuk"
                fill
                className="rounded-xl object-cover shadow-md"
              />
            </div>
            <p className="text-gray-700 text-center">Cek biaya pendaftaran & daftar ulang di sini.</p>
          </CardContent>
        </Card>
      </section>

      {/* Informasi Pendaftaran */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-8 shadow-md text-gray-700">
        <h2 className="text-2xl font-extrabold text-green-600 mb-4">Informasi Pendaftaran</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Buka: 1 Januari 2026</li>
          <li>Tutup: 31 Maret 2026</li>
          <li>Persyaratan: Boleh menyusul / Wajib lengkap</li>
        </ul>
      </section>

      {/* Alur / Tahapan */}
      <section className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl p-8 shadow-md text-gray-700">
        <h2 className="text-2xl font-extrabold text-green-600 mb-4">Alur / Tahapan Pendaftaran</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Isi formulir online</li>
          <li>Upload dokumen</li>
          <li>Verifikasi admin</li>
          <li>Tes / Observasi (jika ada)</li>
          <li>Pengumuman hasil</li>
          <li>Daftar ulang</li>
        </ol>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-tr from-pink-50 via-green-50 to-blue-50 rounded-2xl p-12 text-center shadow-xl space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-600">Yuk Daftar Sekarang!</h2>
        <p className="text-gray-700 max-w-xl mx-auto text-lg md:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-105"
        >
          <Link href="/spmb/daftar">Daftar Sekarang</Link>
        </Button>
      </section>
    </div>
  );
}

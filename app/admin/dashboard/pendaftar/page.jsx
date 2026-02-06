"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Trash2 } from "lucide-react";

export default function PendaftarDashboard() {
  const [pendaftar, setPendaftar] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchData = async (p = 1) => {
    try {
      const res = await fetch(`/api/admin/pendaftar?page=${p}&limit=${limit}`);
      if (!res.ok) throw new Error("Gagal fetch");
      const data = await res.json();
      setPendaftar(data.items);
      setTotalPages(data.totalPages);
    } catch (err) {
      toast.error("Gagal memuat pendaftar");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const toggleVerify = async (id, currentVerified, hp) => {
    try {
      const res = await fetch(`/api/admin/pendaftar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: !currentVerified }),
      });
      if (!res.ok) throw new Error();
      toast.success("Status verifikasi berhasil diubah");
      fetchData(page);
      if (!currentVerified) window.open(`https://wa.me/${hp}`, "_blank");
    } catch {
      toast.error("Gagal mengubah verifikasi");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus pendaftar ini?")) return;
    try {
      const res = await fetch(`/api/admin/pendaftar/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Pendaftar berhasil dihapus");
      fetchData(page);
    } catch {
      toast.error("Gagal menghapus pendaftar");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📋 Data Pendaftar</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>No HP</TableHead>
            <TableHead>Akte</TableHead>
            <TableHead>KK</TableHead>
            <TableHead>Ijazah</TableHead>
            <TableHead>Pas Foto</TableHead>
            <TableHead>Bukti Bayar</TableHead>
            <TableHead>Verifikasi</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pendaftar.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.nama}</TableCell>
              <TableCell>{p.hp}</TableCell>

              {["akte", "kk", "ijazah", "pasFoto", "buktiPembayaran"].map((doc) => (
                <TableCell key={doc}>
                  {p[doc] ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelected(p)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      {doc.toUpperCase()}
                    </Button>
                  ) : (
                    "-"
                  )}
                </TableCell>
              ))}

              <TableCell>
                {p.verified ? (
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <a href={`https://wa.me/${p.hp}`} target="_blank">Chat WA</a>
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => toggleVerify(p.id, p.verified, p.hp)}
                  >
                    Verifikasi
                  </Button>
                )}
              </TableCell>

              <TableCell>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(p.id)}
                >
                  <Trash2 size={16} /> Hapus
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</Button>
        <span>{page} / {totalPages}</span>
        <Button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      </div>

      {/* MODAL DETAIL PENUH */}
      {selected && (
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-4xl space-y-4">
            <DialogHeader>
              <DialogTitle>{selected.nama} - Detail Pendaftar</DialogTitle>
            </DialogHeader>

            <div className="space-y-2">
              <p><strong>Nama:</strong> {selected.nama}</p>
              <p><strong>Tempat Lahir:</strong> {selected.tempatLahir}</p>
              <p><strong>Tanggal Lahir:</strong> {new Date(selected.tanggalLahir).toLocaleDateString()}</p>
              <p><strong>Jenis Kelamin:</strong> {selected.jenisKelamin}</p>
              <p><strong>Nama Ayah:</strong> {selected.namaAyah}</p>
              <p><strong>Nama Ibu:</strong> {selected.namaIbu}</p>
              <p><strong>HP:</strong> {selected.hp}</p>
              <p><strong>Alamat:</strong> {selected.alamat}</p>
              <p><strong>Verifikasi:</strong> {selected.verified ? "Sudah" : "Belum"}</p>
              <p><strong>Tanggal Daftar:</strong> {new Date(selected.createdAt).toLocaleString()}</p>
            </div>

            <h3 className="text-lg font-semibold mt-4">Dokumen:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                ["Akte", selected.akte],
                ["KK", selected.kk],
                ["Ijazah", selected.ijazah],
                ["Pas Foto", selected.pasFoto],
                ["Bukti Bayar", selected.buktiPembayaran],
              ].map(([label, file]) =>
                file && (
                  <Card key={label} className="shadow-md hover:shadow-lg">
                    <CardContent className="p-2 text-center">
                      <h3 className="text-sm font-semibold mb-1">{label}</h3>
                      {label === "Pas Foto" ? (
                        <Image
                          src={file}
                          width={120}
                          height={160}
                          alt={label}
                          className="rounded"
                        />
                      ) : (
                        <a
                          href={file}
                          target="_blank"
                          rel="noreferrer"
                          className="text-green-600 underline text-sm"
                        >
                          Lihat {label}
                        </a>
                      )}
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

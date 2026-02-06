"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { z } from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Trash2, Pencil, Plus, Loader2 } from "lucide-react";

/* ================== VALIDATION ================== */
const guruSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  subject: z.string().min(3, "Mata pelajaran wajib diisi"),
  jenisKelamin: z.enum(["Laki-laki", "Perempuan"], {
    errorMap: () => ({ message: "Jenis kelamin wajib dipilih" }),
  }),
});

/* ================== PAGE ================== */
export default function GuruPage() {
  const [guru, setGuru] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    subject: "",
    jenisKelamin: "",
    photo: "",
    photoFile: null,
  });

  /* ================== FETCH ================== */
  async function fetchGuru() {
    try {
      const res = await fetch("/api/admin/guru");
      const data = await res.json();
      setGuru(data);
    } catch {
      toast.error("Gagal mengambil data guru");
    }
  }

  useEffect(() => {
    fetchGuru();
  }, []);

  /* ================== SUBMIT ================== */
  async function handleSubmit() {
    const parsed = guruSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    // Foto wajib saat tambah
    if (!editingId && !form.photoFile) {
      toast.error("Foto wajib diupload");
      return;
    }

    setLoading(true);
    let photoUrl = form.photo;

    /* ===== Upload Foto ===== */
    if (form.photoFile) {
      const fd = new FormData();
      fd.append("file", form.photoFile);

      try {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });

        if (!uploadRes.ok) throw new Error();
        const uploadData = await uploadRes.json();
        photoUrl = uploadData.url;
      } catch {
        toast.error("Gagal upload foto");
        setLoading(false);
        return;
      }
    }

    /* ===== Save Guru ===== */
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `/api/admin/guru/${editingId}`
        : "/api/admin/guru";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          subject: form.subject,
          jenisKelamin: form.jenisKelamin,
          photo: photoUrl,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success(
        editingId
          ? "✏️ Data guru berhasil diperbarui"
          : "✅ Guru berhasil ditambahkan"
      );

      resetForm();
      fetchGuru();
    } catch {
      toast.error("Gagal menyimpan data guru");
    } finally {
      setLoading(false);
    }
  }

  /* ================== HELPERS ================== */
  function resetForm() {
    setOpen(false);
    setEditingId(null);
    setPreview("");
    setForm({
      name: "",
      subject: "",
      jenisKelamin: "",
      photo: "",
      photoFile: null,
    });
  }

  function handleEdit(g) {
    setForm({
      name: g.name,
      subject: g.subject,
      jenisKelamin: g.jenisKelamin,
      photo: g.photo,
      photoFile: null,
    });
    setPreview(g.photo);
    setEditingId(g.id);
    setOpen(true);
  }

  function handleDelete(id) {
    toast((t) => (
      <div className="space-y-3">
        <p>Yakin ingin menghapus guru ini?</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 rounded bg-red-500 text-white"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const res = await fetch(`/api/admin/guru/${id}`, {
                  method: "DELETE",
                });
                if (!res.ok) throw new Error();
                toast.success("🗑️ Guru berhasil dihapus");
                fetchGuru();
              } catch {
                toast.error("Gagal menghapus data");
              }
            }}
          >
            Hapus
          </button>
          <button
            className="px-3 py-1 rounded bg-gray-200"
            onClick={() => toast.dismiss(t.id)}
          >
            Batal
          </button>
        </div>
      </div>
    ));
  }

  /* ================== UI ================== */
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">👩‍🏫 Data Guru</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-2xl gap-2">
              <Plus size={18} /> Tambah Guru
            </Button>
          </DialogTrigger>

          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit Guru" : "Tambah Guru"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Nama Guru</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Jabatan</Label>
                <Input
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Jenis Kelamin</Label>
                <Select
                  value={form.jenisKelamin}
                  onValueChange={(value) =>
                    setForm({ ...form, jenisKelamin: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Foto Guru</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setForm({ ...form, photoFile: file });
                    setPreview(URL.createObjectURL(file));
                  }}
                />

                {preview && (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={120}
                    height={120}
                    className="mt-3 rounded-xl object-cover"
                  />
                )}
              </div>

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-2xl"
              >
                {loading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Simpan Data
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guru.map((g) => (
          <Card key={g.id} className="rounded-2xl shadow-md">
            <CardHeader className="flex flex-row items-center gap-4">
              <Image
                src={g.photo || "/avatar.png"}
                alt={g.name}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
              <div>
                <CardTitle className="text-lg">{g.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{g.subject}</p>
              </div>
            </CardHeader>

            <CardContent className="flex items-center justify-between">
              <span className="text-sm">{g.jenisKelamin}</span>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleEdit(g)}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(g.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

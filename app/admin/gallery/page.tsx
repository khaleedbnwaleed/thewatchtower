'use client';

import { type ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { galleryItems as defaultGalleryItems, type GalleryItem } from '@/lib/data';
import { loadGalleryItemsFromStorage, saveGalleryItemsToStorage } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LogOut, ArrowLeft, Trash2, UploadCloud } from 'lucide-react';

export default function AdminGalleryPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(defaultGalleryItems);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const stored = loadGalleryItemsFromStorage();
    if (stored.length > 0) {
      setGalleryItems(stored);
    }
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setPreview('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSave = () => {
    if (!title.trim() || !description.trim() || !preview) {
      alert('Please add a title, description, and image for the gallery item.');
      return;
    }

    const newItem: GalleryItem = {
      id: `gallery-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      image: preview,
    };

    const updatedItems = [newItem, ...galleryItems];
    setGalleryItems(updatedItems);
    saveGalleryItemsToStorage(updatedItems);
    setTitle('');
    setDescription('');
    setImageFile(null);
    setPreview('');
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this gallery item?')) {
      return;
    }

    const updatedItems = galleryItems.filter((item) => item.id !== id);
    setGalleryItems(updatedItems);
    saveGalleryItemsToStorage(updatedItems);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Manage Gallery</h1>
              <p className="text-sm text-muted-foreground">Upload infographic assets for the public gallery.</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Card className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex-1 space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Add New Infographic</h2>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for the infographic"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a short description"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={handleSave} className="gap-2">
                  <UploadCloud className="w-4 h-4" />
                  Save Gallery Item
                </Button>
                <Button variant="secondary" onClick={() => {
                  setTitle('');
                  setDescription('');
                  setImageFile(null);
                  setPreview('');
                }}>
                  Clear
                </Button>
              </div>
            </div>

            <div className="w-full lg:w-96">
              <h3 className="text-lg font-semibold text-foreground mb-4">Preview</h3>
              <div className="rounded-3xl overflow-hidden border border-border bg-muted h-80 relative">
                {preview ? (
                  <Image src={preview} alt="Gallery preview" fill className="object-cover" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-sm text-muted-foreground px-4 text-center">
                    <p className="font-semibold">No image selected</p>
                    <p className="mt-2">Upload a PNG, JPG, or SVG file to see a preview.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Existing Gallery Items</h2>
            <p className="text-sm text-muted-foreground">{galleryItems.length} item(s)</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {galleryItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative aspect-[4/3] bg-slate-950">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-base font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

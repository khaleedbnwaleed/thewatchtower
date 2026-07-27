'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { projects, categoryLabels, statusLabels, Project, galleryItems as defaultGalleryItems } from '@/lib/data';
import { loadGalleryItemsFromStorage } from '@/lib/utils';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Filter, Search, X } from 'lucide-react';

type CategoryFilter = Project['category'] | 'all';
type StatusFilter = Project['status'] | 'all';

export function HomePageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [galleryData, setGalleryData] = useState(defaultGalleryItems);

  useEffect(() => {
    const storedGallery = loadGalleryItemsFromStorage();
    if (storedGallery.length > 0) {
      setGalleryData(storedGallery);
    }
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || project.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, categoryFilter, statusFilter]);

  const hasActiveFilters = categoryFilter !== 'all' || statusFilter !== 'all' || searchQuery !== '';
  const categoryOptions = Object.entries(categoryLabels).map(([value, label]) => ({ value, label }));
  const statusOptions = Object.entries(statusLabels).map(([value, label]) => ({ value, label }));

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden border-b bg-gradient-to-r from-primary/15 via-transparent to-secondary/10 py-12 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_30%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary mx-auto md:mx-0">
                <span className="uppercase tracking-[0.3em]">Beyond Rhetorics</span>
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>Jigawa State Government, Nigeria</span>
              </div>

              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                  <span className="text-primary">Transparency</span> in Public Projects
                </h1>
                <p className="text-lg text-muted-foreground text-balance max-w-2xl">
                  Monitor government infrastructure projects across Jigawa State. Track progress, budgets, and timelines in real-time while reinforcing accountability through clear public visibility.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto md:mx-0 pt-2">
                <div className="rounded-2xl border border-primary/15 bg-background/80 p-3 text-center shadow-sm" />
              </div>
            </div>

            <div className="mx-auto w-full max-w-md rounded-[2rem] border border-secondary/20 bg-background/90 p-4 shadow-xl shadow-secondary/10 backdrop-blur-sm sm:p-5">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-slate-50 aspect-[4/5]">
                <img
                  src="/Danmodi.jpg?v=2"
                  alt="Portrait of Governor Malam Umar A. Namadi"
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-5 text-center">
                <p className="text-sm uppercase tracking-[0.28em] text-secondary font-semibold">His Excellency</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">Malam Umar A. Namadi, FCA</p>
                <p className="mt-1 text-sm text-muted-foreground">Executive Governor, Jigawa State</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Visualization Section */}
      <section id="projects" className="border-b py-12 md:py-16 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] items-center">
            <div className="space-y-4 text-white">
              <p className="text-sm uppercase tracking-[0.32em] text-sky-300 font-semibold">Public Insight Layer</p>
              <h2 className="text-3xl md:text-4xl font-bold text-balance">A data-first view of project delivery</h2>
              <p className="max-w-2xl text-slate-300">
                The Watch Tower transforms raw project information into a clear public-facing overview, making progress, budgets, and milestones easier to understand.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/30">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/chat.png"
                  alt="Public project dashboard visualization"
                  fill
                  priority={false}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="border-t bg-background/80 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border/70 bg-card/70 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">Gallery</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">A simple gallery section for now</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              This placeholder section is available so the gallery link can navigate to a meaningful anchor.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="border-t bg-muted/30 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border/70 bg-background/80 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">About</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">About The Watch Tower</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              The Watch Tower helps citizens and stakeholders follow public projects with clarity and accountability.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t bg-background py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">Contact</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">Get in touch</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Contact the team through the public project transparency portal for updates and collaboration.
            </p>
          </div>
        </div>
      </section>

    </>
  );
}

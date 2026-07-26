'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { projects as initialProjects } from '@/lib/data';
import { ProjectForm } from '@/components/project-form';
import { LogOut, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planned' | 'ongoing' | 'completed';
  location: string;
  budget: number;
  startDate: string;
  endDate: string;
  progress: number;
  latitude: number;
  longitude: number;
}

export default function EditProjectPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (projectId && projectId !== 'new') {
      const found = projects.find(p => p.id === projectId);
      setProject(found || null);
    }
  }, [projectId, projects]);

  const handleSubmit = (updatedProject: Project) => {
    if (projectId === 'new') {
      setProjects([...projects, { ...updatedProject, id: Math.random().toString() }]);
    } else {
      setProjects(projects.map(p => p.id === projectId ? updatedProject : p));
    }
    router.push('/admin/projects');
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const isNew = projectId === 'new';
  const isLoaded = isNew || project !== null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/projects">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Projects
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">
              {isNew ? 'Add New Project' : 'Edit Project'}
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoaded && (
          <Card className="p-8">
            <ProjectForm
              project={isNew ? undefined : project || undefined}
              onSubmit={handleSubmit}
              onCancel={() => router.push('/admin/projects')}
            />
          </Card>
        )}
        {!isLoaded && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Project not found</p>
          </Card>
        )}
      </main>
    </div>
  );
}

'use client';

import { projects } from '@/lib/data';
import { ProjectMap } from '@/components/project-map';
import { Header } from '@/components/header';

export default function MapPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Info Bar */}
        <div className="border-b bg-muted/40 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">Projects Map</h1>
            <p className="text-sm text-muted-foreground">
              Click on markers to view project details. {projects.length} projects tracked across Jigawa State.
            </p>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 overflow-hidden">
          <ProjectMap projects={projects} />
        </div>
      </div>
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { Project } from '@/lib/data';

interface ProjectMapProps {
  projects: Project[];
  selectedProjectId?: string;
}

function FallbackMap({ projects, selectedMarker, onMarkerSelect }: { 
  projects: Project[];
  selectedMarker: string | null;
  onMarkerSelect: (id: string) => void;
}) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 flex flex-col">
      {/* Mock Map Area */}
      <div className="flex-1 relative overflow-auto p-4">
        <div className="relative w-full h-96 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
          <svg className="w-full h-full" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
            {/* Map background */}
            <rect width="500" height="400" fill="#f0f9ff" opacity="0.5" />
            
            {/* Jigawa State boundary (simplified) */}
            <path
              d="M 50 80 Q 150 70 250 80 Q 350 90 450 100 L 450 280 Q 350 300 250 310 Q 150 300 50 280 Z"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2"
              opacity="0.5"
            />
            
            {/* Project markers */}
            {projects.map((project, idx) => {
              const baseX = 100 + (idx % 3) * 120;
              const baseY = 120 + Math.floor(idx / 3) * 100;
              const isSelected = selectedMarker === project.id;
              
              return (
                <g key={project.id}>
                  <circle
                    cx={baseX}
                    cy={baseY}
                    r={isSelected ? 12 : 8}
                    fill={isSelected ? '#2563eb' : '#ef4444'}
                    opacity={isSelected ? 1 : 0.7}
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                    onClick={() => onMarkerSelect(project.id)}
                  />
                  {isSelected && (
                    <circle
                      cx={baseX}
                      cy={baseY}
                      r={16}
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        
        {/* Projects List */}
        <div className="mt-4 space-y-2 max-h-32 overflow-y-auto">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => onMarkerSelect(project.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedMarker === project.id
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-medium'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {project.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Project Details Panel */}
      {selectedMarker && projects.find(p => p.id === selectedMarker) && (
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
          {(() => {
            const project = projects.find(p => p.id === selectedMarker);
            return project ? (
              <div>
                <h3 className="font-semibold text-sm">{project.name}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{project.location}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Status: {project.status}</p>
              </div>
            ) : null;
          })()}
        </div>
      )}
      
      {/* Fallback Message */}
      <div className="absolute top-4 right-4 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-3 max-w-xs text-xs text-amber-800 dark:text-amber-200">
        <p className="font-semibold">Demo Map View</p>
        <p className="mt-1">Add <code className="bg-amber-100 dark:bg-amber-900 px-1">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to enable the full interactive map.</p>
      </div>
    </div>
  );
}

export function ProjectMap({ projects, selectedProjectId }: ProjectMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(selectedProjectId || null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || '',
  });

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );

  const center = useMemo(
    () => ({
      lat: 11.8,
      lng: 9.5,
    }),
    []
  );

  if (!apiKey) {
    return <FallbackMap projects={projects} selectedMarker={selectedMarker} onMarkerSelect={setSelectedMarker} />;
  }

  if (loadError) {
    return <FallbackMap projects={projects} selectedMarker={selectedMarker} onMarkerSelect={setSelectedMarker} />;
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    );
  }

  return (
    <GoogleMap
      zoom={8}
      center={center}
      mapContainerClassName="w-full h-full rounded-lg"
      options={mapOptions}
    >
      {projects.map((project) => (
        <MarkerF
          key={project.id}
          position={project.coordinates}
          onClick={() => setSelectedMarker(project.id)}
          title={project.name}
        >
          {selectedMarker === project.id && (
            <InfoWindowF
              onCloseClick={() => setSelectedMarker(null)}
              options={{
                pixelOffset: new window.google.maps.Size(0, -35),
              }}
            >
              <div className="p-3 bg-white rounded-lg max-w-xs">
                <h3 className="font-semibold text-sm">{project.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{project.location}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Status: {project.status}
                </p>
              </div>
            </InfoWindowF>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

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

interface ProjectFormProps {
  project?: Project;
  onSubmit: (project: Project) => void;
  onCancel: () => void;
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>(
    project || {
      id: Math.random().toString(),
      name: '',
      description: '',
      status: 'planned',
      location: '',
      budget: 0,
      startDate: '',
      endDate: '',
      progress: 0,
      latitude: 12.1765,
      longitude: 8.5833,
    }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof Project, string>>>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = 'Project name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (formData.budget <= 0) newErrors.budget = 'Budget must be greater than 0';
    if (formData.progress < 0 || formData.progress > 100) newErrors.progress = 'Progress must be between 0-100';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Project Name *</label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder="Enter project name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Location *</label>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) => {
                setFormData({ ...formData, location: e.target.value });
                if (errors.location) setErrors({ ...errors, location: '' });
              }}
              placeholder="Enter location"
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              if (errors.description) setErrors({ ...errors, description: '' });
            }}
            placeholder="Enter project description"
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Status *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="planned">Planned</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Budget (₦) *</label>
            <Input
              type="number"
              value={formData.budget}
              onChange={(e) => {
                setFormData({ ...formData, budget: parseFloat(e.target.value) || 0 });
                if (errors.budget) setErrors({ ...errors, budget: '' });
              }}
              placeholder="0"
            />
            {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Progress (%) *</label>
            <Input
              type="number"
              value={formData.progress}
              onChange={(e) => {
                setFormData({ ...formData, progress: parseFloat(e.target.value) || 0 });
                if (errors.progress) setErrors({ ...errors, progress: '' });
              }}
              min="0"
              max="100"
              placeholder="0"
            />
            {errors.progress && <p className="text-red-500 text-xs mt-1">{errors.progress}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Start Date</label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">End Date</label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Latitude</label>
            <Input
              type="number"
              step="0.0001"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) || 0 })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Longitude</label>
            <Input
              type="number"
              step="0.0001"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {project ? 'Update Project' : 'Create Project'}
          </Button>
        </div>
      </div>
    </form>
  );
}

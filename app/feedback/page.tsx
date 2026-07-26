'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { feedbackSchema, FeedbackFormData } from '@/lib/schemas';
import { projects, getProjectById, categoryLabels } from '@/lib/data';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, CheckCircle } from 'lucide-react';

function FeedbackPageContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      projectId: projectId || undefined,
    },
  });

  const selectedProjectId = watch('projectId');
  const selectedProject = selectedProjectId && selectedProjectId !== 'none' ? getProjectById(selectedProjectId) : null;

  useEffect(() => {
    if (projectId) {
      setValue('projectId', projectId);
    }
  }, [projectId, setValue]);

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      const normalizedData = {
        ...data,
        projectId: data.projectId === 'none' ? undefined : data.projectId,
      };

      // Simulate API call - in production, this would send to a backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Feedback submitted:', normalizedData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold flex items-center gap-2">
              <MessageCircle className="w-8 h-8" />
              Share Your Feedback
            </h1>
            <p className="text-lg text-muted-foreground">
              Help us improve public project transparency by sharing your observations, concerns, or suggestions.
            </p>
          </div>

          {/* Success Message */}
          {submitted && (
            <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-900">
              <CardContent className="flex items-center gap-3 pt-6">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-900 dark:text-green-100">Thank you for your feedback!</p>
                  <p className="text-sm text-green-700 dark:text-green-200">
                    Your input helps improve government accountability and project delivery.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Feedback Form */}
          <Card>
            <CardHeader>
              <CardTitle>Feedback Form</CardTitle>
              <CardDescription>
                All information is confidential and will be used to improve project management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Project Selection */}
                <div className="space-y-2">
                  <label htmlFor="projectId" className="block text-sm font-medium">
                    Project (Optional)
                  </label>
                  <Select value={selectedProjectId ?? undefined} onValueChange={(value) => setValue('projectId', value)}>
                    <SelectTrigger id="projectId">
                      <SelectValue placeholder="Select a project..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Not related to a specific project</SelectItem>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedProject && (
                    <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        {selectedProject.name}
                      </p>
                      <p className="text-xs text-blue-700 dark:text-blue-200 mt-1">
                        {selectedProject.location} • {categoryLabels[selectedProject.category]}
                      </p>
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    {...register('name')}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-medium">
                    Feedback Category *
                  </label>
                  <Select {...register('category')} defaultValue="">
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="issue">Report an Issue</SelectItem>
                      <SelectItem value="suggestion">Suggestion for Improvement</SelectItem>
                      <SelectItem value="praise">Positive Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Your Message *
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Please provide detailed feedback..."
                    rows={6}
                    {...register('message')}
                    className={errors.message ? 'border-red-500' : ''}
                  />
                  {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree that your feedback may be used to improve public services.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Info Section */}
          <Card className="bg-muted/40">
            <CardHeader>
              <CardTitle className="text-lg">Why Your Feedback Matters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                ✓ <strong>Transparency:</strong> Public feedback creates accountability in project delivery
              </p>
              <p>
                ✓ <strong>Improvement:</strong> Your observations help identify issues and opportunities
              </p>
              <p>
                ✓ <strong>Community Voice:</strong> Citizens' input shapes better governance and public services
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/40 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>The Watch Tower - Promoting Transparency in Public Project Delivery</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}> 
      <FeedbackPageContent />
    </Suspense>
  );
}

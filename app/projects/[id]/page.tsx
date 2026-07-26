'use client';

import { getProjectById, statusLabels, categoryLabels } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, User, Mail, Calendar, DollarSign, Building2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { notFound } from 'next/navigation';

export default function ProjectDetail() {
  const params = useParams();
  const project = getProjectById(params.id as string);

  if (!project) {
    notFound();
  }

  const statusColor = {
    planning: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    ongoing: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    paused: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };


  const budgetData = [
    {
      name: 'Spent',
      value: project.budget.spent,
    },
    {
      name: 'Remaining',
      value: project.budget.total - project.budget.spent,
    },
  ];

  const budgetChartData = [
    {
      category: 'Budget',
      spent: project.budget.spent,
      remaining: project.budget.total - project.budget.spent,
    },
  ];

  const COLORS = ['#3b82f6', '#e5e7eb'];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Button>
        </Link>

        {/* Header Section */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-balance">{project.name}</h1>
              <p className="text-muted-foreground mt-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {project.location}
              </p>
            </div>
            <Badge className={`${statusColor[project.status]} text-lg px-4 py-2`}>
              {statusLabels[project.status]}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">{project.description}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Budget</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(project.budget.total)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Spent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(project.budget.spent)}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {((project.budget.spent / project.budget.total) * 100).toFixed(1)}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.timeline.completionPercentage}%</div>
              <p className="text-sm text-muted-foreground mt-1">Complete</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Completion Status</span>
                <span className="text-muted-foreground">{project.timeline.completionPercentage}%</span>
              </div>
              <Progress value={project.timeline.completionPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Budget Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Budget vs Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={budgetChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="spent" fill="#3b82f6" name="Spent" />
                  <Bar dataKey="remaining" fill="#e5e7eb" name="Remaining" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground flex-1">
                  <Calendar className="w-4 h-4" />
                  <span>Start Date:</span>
                </div>
                <span className="font-medium">
                  {new Date(project.timeline.startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground flex-1">
                  <Calendar className="w-4 h-4" />
                  <span>Expected End Date:</span>
                </div>
                <span className="font-medium">
                  {new Date(project.timeline.endDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Category</p>
                <p className="font-medium">{categoryLabels[project.category]}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge className={statusColor[project.status]}>
                  {statusLabels[project.status]}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contractor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Contractor
                </p>
                <p className="font-medium">{project.contractor}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Contact Person
                </p>
                <p className="font-medium">{project.contact}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </p>
                <a href={`mailto:${project.email}`} className="font-medium text-primary hover:underline">
                  {project.email}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Updates */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.updates.length === 0 ? (
                <p className="text-muted-foreground">No updates available yet.</p>
              ) : (
                project.updates.map((update, index) => (
                  <div key={index} className="pb-4 border-b last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">
                          {new Date(update.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                        <p className="font-medium mt-1">{update.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card>
          <CardHeader>
            <CardTitle>Have feedback about this project?</CardTitle>
            <CardDescription>
              Share your concerns, suggestions, or observations about this project's progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={`/feedback?projectId=${project.id}`}>
              <Button size="lg" className="w-full">
                Submit Feedback
              </Button>
            </Link>
          </CardContent>
        </Card>
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

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { projects, feedbacks } from '@/lib/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LogOut, Settings, Users, FileText, MessageSquare, ImagePlus } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  // Calculate statistics
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const ongoingProjects = projects.filter(p => p.status === 'ongoing').length;
  const plannedProjects = projects.filter(p => p.status === 'planned').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget.total, 0);
  const totalFeedback = feedbacks.length;

  // Status distribution for chart
  const statusData = [
    { name: 'Completed', value: completedProjects },
    { name: 'Ongoing', value: ongoingProjects },
    { name: 'Planned', value: plannedProjects },
  ];

  const COLORS = ['#4ade80', '#4f46e5', '#06b6d4'];

  // Budget distribution
  const budgetData = projects.slice(0, 8).map(p => ({
    name: p.name.substring(0, 15) + '...',
    budget: Math.round(p.budget / 1000000),
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Watch Tower Admin</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/settings">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-3xl font-bold text-primary mt-2">{totalProjects}</p>
              </div>
              <FileText className="w-8 h-8 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50/30 to-transparent dark:from-blue-950/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ongoing Projects</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{ongoingProjects}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-green-500 bg-gradient-to-br from-green-50/30 to-transparent dark:from-green-950/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Feedback</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{totalFeedback}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-secondary bg-gradient-to-br from-secondary/5 to-transparent">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold text-secondary mt-2">₦{Math.round(totalBudget / 1000000)}M</p>
              </div>
              <FileText className="w-8 h-8 text-secondary opacity-20" />
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 lg:col-span-2 border-t-4 border-t-primary">
            <h2 className="text-lg font-semibold text-foreground mb-4">Project Budget Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground) / 0.6)" />
                <YAxis stroke="hsl(var(--muted-foreground) / 0.6)" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Bar dataKey="budget" fill="hsl(142.5, 76.5%, 41.2%)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Project Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Action Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/projects">
            <Card className="p-6 hover:border-primary cursor-pointer transition-colors">
              <FileText className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Manage Projects</h3>
              <p className="text-sm text-muted-foreground">Add, edit, and manage infrastructure projects</p>
            </Card>
          </Link>

          <Link href="/admin/feedback">
            <Card className="p-6 hover:border-primary cursor-pointer transition-colors">
              <MessageSquare className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="font-semibold text-foreground mb-2">View Feedback</h3>
              <p className="text-sm text-muted-foreground">Review citizen feedback and suggestions</p>
            </Card>
          </Link>

          <Link href="/admin/gallery">
            <Card className="p-6 hover:border-primary cursor-pointer transition-colors">
              <ImagePlus className="w-8 h-8 text-violet-500 mb-3" />
              <h3 className="font-semibold text-foreground mb-2">Manage Gallery</h3>
              <p className="text-sm text-muted-foreground">Add infographic designs and manage the public gallery</p>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  );
}

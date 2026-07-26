'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { feedbacks as initialFeedbacks } from '@/lib/data';
import { LogOut, Trash2, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface Feedback {
  id: string;
  projectId: string;
  projectName: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  createdAt: string;
  resolved: boolean;
}

export default function AdminFeedbackPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  const [filter, setFilter] = useState<'all' | 'unresolved' | 'resolved'>('all');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/admin/login');
    }
  }, [user, isLoading, router]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      setFeedbacks(feedbacks.filter(f => f.id !== id));
    }
  };

  const handleResolve = (id: string) => {
    setFeedbacks(feedbacks.map(f => 
      f.id === id ? { ...f, resolved: !f.resolved } : f
    ));
  };

  const filteredFeedbacks = feedbacks.filter(f => {
    if (filter === 'unresolved') return !f.resolved;
    if (filter === 'resolved') return f.resolved;
    return true;
  });

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Feedback Management</h1>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Citizen Feedback ({filteredFeedbacks.length})</h2>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All ({feedbacks.length})
            </Button>
            <Button
              variant={filter === 'unresolved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('unresolved')}
            >
              Unresolved ({feedbacks.filter(f => !f.resolved).length})
            </Button>
            <Button
              variant={filter === 'resolved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('resolved')}
            >
              Resolved ({feedbacks.filter(f => f.resolved).length})
            </Button>
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="space-y-4">
          {filteredFeedbacks.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No feedback found</p>
            </Card>
          ) : (
            filteredFeedbacks.map((feedback) => (
              <Card key={feedback.id} className={`p-6 border-l-4 ${feedback.resolved ? 'border-l-green-500' : 'border-l-amber-500'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground">{feedback.name}</h3>
                      <span className={`text-lg font-bold ${getRatingColor(feedback.rating)}`}>
                        {'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Project:</strong> {feedback.projectName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Email:</strong> {feedback.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Date:</strong> {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {feedback.resolved && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>

                <p className="text-foreground mb-4 leading-relaxed">{feedback.message}</p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResolve(feedback.id)}
                  >
                    {feedback.resolved ? 'Mark as Unresolved' : 'Mark as Resolved'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(feedback.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

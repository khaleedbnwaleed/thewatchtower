import { Header } from '@/components/header';
import { HomePageClient } from '@/components/home-page-client';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomePageClient />

      {/* Footer */}
      <footer className="border-t bg-muted/40 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>The Watch Tower - Promoting Transparency in Public Project Delivery</p>
            <p className="mt-2">Jigawa State, Nigeria</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

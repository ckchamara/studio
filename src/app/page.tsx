
import GracePeriodCard from '@/components/grace-period-card';
import VerificationTabs from '@/components/verification-tabs';
import { ShieldCheck } from 'lucide-react';

export default function HomePage() {
  // Calculate grace period: 3 weeks from a fixed point or current date for demo
  // For a consistent demo, let's fix the start date or use a future date.
  // If this were a real app, this date would come from user data.
  const gracePeriodEndDate = new Date();
  gracePeriodEndDate.setDate(gracePeriodEndDate.getDate() + 21); // 3 weeks from now

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-8 sm:py-12 px-4">
      <header className="mb-8 sm:mb-12 text-center">
        <div className="flex items-center justify-center mb-3">
          <ShieldCheck className="h-10 w-10 sm:h-12 sm:w-12 text-primary animate-pulse" />
          <h1 className="text-4xl sm:text-5xl font-headline ml-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            UniStudent
          </h1>
        </div>
        <p className="text-md sm:text-lg text-muted-foreground">
          Secure &amp; Seamless Student Verification
        </p>
      </header>
      
      <main className="w-full max-w-2xl space-y-8">
        <GracePeriodCard endDate={gracePeriodEndDate} />
        <VerificationTabs />
      </main>

      <footer className="mt-12 text-center text-xs sm:text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} UniStudent. All rights reserved.</p>
        <p>Trust. Security. Verification.</p>
      </footer>
    </div>
  );
}

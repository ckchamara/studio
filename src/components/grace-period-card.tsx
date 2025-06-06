
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

interface GracePeriodCardProps {
  endDate: Date;
}

export default function GracePeriodCard({ endDate }: GracePeriodCardProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const calculateTimeLeft = () => {
      const now = new Date();
      if (now >= endDate) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = differenceInDays(endDate, now);
      const hours = differenceInHours(endDate, now) % 24;
      const minutes = differenceInMinutes(endDate, now) % 60;
      const seconds = differenceInSeconds(endDate, now) % 60;
      
      setTimeLeft({ 
        days: Math.max(0, days), 
        hours: Math.max(0, hours), 
        minutes: Math.max(0, minutes), 
        seconds: Math.max(0, seconds) 
      });
    };

    calculateTimeLeft(); // Initial calculation
    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, [endDate]);

  if (!hasMounted) {
    // Render placeholder or null during SSR to avoid hydration mismatch
    return (
      <Card className="bg-card border-accent shadow-md animate-pulse">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 pt-3 px-4">
          <CardTitle className="text-base font-medium text-accent-foreground">Trial Period Reminder</CardTitle>
          <ShieldAlert className="h-5 w-5 text-accent" />
        </CardHeader>
        <CardContent className="px-4 pb-3 pt-1">
          <p className="text-lg h-5 bg-muted-foreground/20 rounded w-3/4"></p>
          <p className="text-xs text-muted-foreground mt-1 h-3 bg-muted-foreground/10 rounded w-full"></p>
        </CardContent>
      </Card>
    );
  }
  
  const gracePeriodEnded = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && new Date() >= endDate;

  return (
    <Card className="bg-card border-accent shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 pt-3 px-4">
        <CardTitle className="text-base font-medium text-accent-foreground">Trial Period Reminder</CardTitle>
        <ShieldAlert className="h-5 w-5 text-accent" />
      </CardHeader>
      <CardContent className="px-4 pb-3 pt-1">
        {gracePeriodEnded ? (
          <p className="text-lg font-bold text-destructive">Your trial period has ended.</p>
        ) : (
          <p className="text-lg">
            You have <span className="font-bold text-accent">{String(timeLeft.days).padStart(2, '0')}d {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s</span> left.
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Please verify your student status to continue accessing services.
        </p>
      </CardContent>
    </Card>
  );
}

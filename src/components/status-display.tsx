
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, ShieldAlert, MailCheck, AlertTriangle, Hourglass } from 'lucide-react';
import type { VerificationStatus } from './verification-tabs'; // Ensure this path is correct
import { cn } from '@/lib/utils';

interface StatusDisplayProps {
  status: VerificationStatus;
}

const statusConfig = {
  'not-verified': {
    Icon: ShieldAlert,
    title: 'Status: Not Verified',
    message: 'Your student status is not yet verified. Please choose a verification method from the tabs above.',
    color: 'text-yellow-400', 
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
  },
  'email-pending': {
    Icon: MailCheck,
    title: 'Status: Email Verification Pending',
    message: 'A verification link has been sent to your email. Please check your inbox (and spam folder) and click the link to complete verification.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  'email-verified': {
    Icon: ShieldCheck,
    title: 'Status: Verified via Email!',
    message: 'Your student status has been successfully verified using your university email.',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
  'id-pending': {
    Icon: Hourglass,
    title: 'Status: ID Review Pending',
    message: 'Your student ID has been uploaded and is currently under review. This process typically takes 24-48 hours. We will notify you of the outcome.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  'id-verified': {
    Icon: ShieldCheck,
    title: 'Status: Verified via ID!',
    message: 'Congratulations! Your student status has been successfully verified using your uploaded ID.',
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
  },
  'id-rejected': {
    Icon: AlertTriangle,
    title: 'Status: ID Verification Rejected',
    message: 'Unfortunately, your ID verification was not successful. Please navigate to the "Upload Student ID" tab for more details or to try again.',
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
  },
};

export default function StatusDisplay({ status }: StatusDisplayProps) {
  const currentDisplay = statusConfig[status];
  const { Icon, title, message, color, bgColor, borderColor } = currentDisplay;

  return (
    <div className={cn(
        "p-5 md:p-6 rounded-xl border transition-all duration-300 ease-in-out",
        bgColor, 
        borderColor,
        "shadow-md hover:shadow-lg"
      )}>
      <div className="flex flex-col items-center text-center space-y-2.5">
        <Icon className={cn("w-12 h-12 md:w-16 md:h-16 mb-2 opacity-80", color)} />
        <h3 className={cn("text-lg md:text-xl font-semibold", color.replace('text-', 'text-'))}>{title}</h3>
        <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
}


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { VerificationStatus, FeedbackMessage } from './verification-tabs'; // Ensure this path is correct
import { useState } from "react";
import { MailCheck, ShieldCheck, Loader2 } from "lucide-react";

const emailFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).refine(
    (email) => email.endsWith(".edu") || email.endsWith(".ac.uk") || email.endsWith(".edu.au"), // Example university domains
    { message: "Please use a valid university email address (e.g., ending in .edu, .ac.uk)." }
  ),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

interface EmailVerificationFormProps {
  setStatus: (status: VerificationStatus) => void;
  setFeedback: (feedback: FeedbackMessage | null) => void;
  currentStatus: VerificationStatus;
}

export default function EmailVerificationForm({ setStatus, setFeedback, currentStatus }: EmailVerificationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: EmailFormValues) => {
    setIsLoading(true);
    setFeedback(null);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    if (data.email.includes("fail@")) { // Simulate failure
      setStatus('not-verified');
      setFeedback({ type: 'error', title: 'Verification Failed', text: 'Could not verify this email. Please try again or use a different email.' });
    } else {
      setStatus('email-pending');
      setFeedback({ type: 'success', title: 'Verification Email Sent!', text: `A verification link has been sent to ${data.email}. Please check your inbox.` });
    }
    setIsLoading(false);
  };
  
  if (currentStatus === 'email-verified' || currentStatus === 'id-verified') {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center bg-secondary rounded-lg shadow-inner">
        <ShieldCheck className="w-12 h-12 text-green-500 mb-3" />
        <h3 className="text-lg font-semibold mb-1.5">Already Verified!</h3>
        <p className="text-xs text-muted-foreground">Your student status is confirmed.</p>
      </div>
    );
  }
  
  if (currentStatus === 'email-pending') {
     return (
      <div className="flex flex-col items-center justify-center p-6 text-center bg-secondary rounded-lg shadow-inner">
        <MailCheck className="w-12 h-12 text-primary mb-3" />
        <h3 className="text-lg font-semibold mb-1.5">Check Your Email</h3>
        <p className="text-xs text-muted-foreground">A verification link was sent to your email address. Please click the link to complete verification.</p>
      </div>
    );   
  }

  return (
    <div className="p-1 rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-center">Verify with University Email</h3>
      <p className="text-xs text-muted-foreground mb-5 text-center">
        Enter your official university email address. We'll send a verification link to confirm your student status.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">University Email</FormLabel>
                <FormControl>
                  <Input placeholder="yourname@university.edu" {...field} className="bg-input text-sm"/>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2.5 text-sm" disabled={isLoading} size="sm">
            {isLoading ? <><Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> Verifying...</> : 'Send Verification Email'}
          </Button>
        </form>
      </Form>
    </div>
  );
}

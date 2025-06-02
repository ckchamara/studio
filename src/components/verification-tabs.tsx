
"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmailVerificationForm from './email-verification-form';
import IdUploadForm from './id-upload-form';
import StatusDisplay from './status-display';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react'; 

export type VerificationStatus = 
  | 'not-verified' 
  | 'email-pending' 
  | 'email-verified' 
  | 'id-pending' 
  | 'id-verified' 
  | 'id-rejected';

export interface FeedbackMessage {
  type: 'success' | 'error';
  title: string;
  text: string;
}

export default function VerificationTabs() {
  const [status, setStatus] = useState<VerificationStatus>('not-verified');
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);
  const [activeTab, setActiveTab] = useState<string>("email");
  const [verificationMethodChosen, setVerificationMethodChosen] = useState<boolean>(false);
  const [chosenMethod, setChosenMethod] = useState<'email' | 'id' | null>(null);

  const handleSetFeedback = (message: FeedbackMessage | null) => {
    setFeedback(message);
    if (message) {
      setTimeout(() => {
        setFeedback((currentFeedback) => 
          (currentFeedback && currentFeedback.title === message.title && currentFeedback.text === message.text) ? null : currentFeedback
        );
      }, 7000);
    }
  };
  
  const handleSetStatusAndChoice = (newStatus: VerificationStatus) => {
    setStatus(newStatus);
    if (!verificationMethodChosen) {
      if (newStatus === 'email-pending') {
        setVerificationMethodChosen(true);
        setChosenMethod('email');
      } else if (newStatus === 'id-pending') {
        setVerificationMethodChosen(true);
        setChosenMethod('id');
      }
    }
    
    if (newStatus === 'not-verified') {
      setVerificationMethodChosen(false);
      setChosenMethod(null);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const FeedbackIcon = feedback?.type === 'success' ? CheckCircle2 : AlertCircle;

  const isUserVerified = status === 'email-verified' || status === 'id-verified';

  const isEmailTabDisabled = 
    isUserVerified || 
    (verificationMethodChosen && chosenMethod === 'id');
  
  const isIdTabDisabled = 
    isUserVerified || 
    (verificationMethodChosen && chosenMethod === 'email');

  return (
    <Card className="w-full shadow-xl border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl text-center font-headline text-primary">Verification Center</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {feedback && (
          <Alert variant={feedback.type === 'error' ? 'destructive' : 'default'} className="mb-6 shadow-md">
            <FeedbackIcon className="h-5 w-5" />
            <AlertTitle className="font-semibold">{feedback.title}</AlertTitle>
            <AlertDescription>{feedback.text}</AlertDescription>
          </Alert>
        )}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-secondary/50 p-1 rounded-lg">
            <TabsTrigger 
              value="email" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              disabled={isEmailTabDisabled}
            >
              Verify by Email
            </TabsTrigger>
            <TabsTrigger 
              value="id" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md"
              disabled={isIdTabDisabled}
            >
              Upload Student ID
            </TabsTrigger>
            <TabsTrigger value="status" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">Check Status</TabsTrigger>
          </TabsList>
          <TabsContent value="email" className="outline-none ring-0 focus-visible:ring-0">
            <EmailVerificationForm 
              setStatus={handleSetStatusAndChoice} 
              setFeedback={handleSetFeedback} 
              currentStatus={status} 
            />
          </TabsContent>
          <TabsContent value="id" className="outline-none ring-0 focus-visible:ring-0">
            <IdUploadForm 
              setStatus={handleSetStatusAndChoice} 
              setFeedback={handleSetFeedback} 
              currentStatus={status} 
            />
          </TabsContent>
          <TabsContent value="status" className="outline-none ring-0 focus-visible:ring-0">
            <StatusDisplay status={status} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

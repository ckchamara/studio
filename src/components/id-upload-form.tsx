
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
import { UploadCloud, ShieldCheck, AlertTriangle, Loader2, Hourglass } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];

const idUploadFormSchema = z.object({
  studentIdFile: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, "Please select a file.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png, .webp and .pdf files are accepted."
    ),
});

type IdUploadFormValues = z.infer<typeof idUploadFormSchema>;

interface IdUploadFormProps {
  setStatus: (status: VerificationStatus) => void;
  setFeedback: (feedback: FeedbackMessage | null) => void;
  currentStatus: VerificationStatus;
}

export default function IdUploadForm({ setStatus, setFeedback, currentStatus }: IdUploadFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<IdUploadFormValues>({
    resolver: zodResolver(idUploadFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: IdUploadFormValues) => {
    setIsLoading(true);
    setFeedback(null);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call & file upload

    if (data.studentIdFile[0].name.includes("reject")) { // Simulate rejection
      setStatus('id-rejected');
      setFeedback({ type: 'error', title: 'Upload Failed', text: 'Your ID could not be verified. Please ensure it is clear, valid, and not expired.' });
    } else {
      setStatus('id-pending');
      setFeedback({ type: 'success', title: 'ID Uploaded Successfully!', text: 'Your student ID is pending review. This may take up to 24-48 hours.' });
    }
    setIsLoading(false);
    form.reset({ studentIdFile: undefined }); 
  };
  
  if (currentStatus === 'email-verified' || currentStatus === 'id-verified') {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-secondary rounded-lg shadow-inner">
        <ShieldCheck className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Already Verified!</h3>
        <p className="text-muted-foreground">Your student status is confirmed.</p>
      </div>
    );
  }

  if (currentStatus === 'id-pending') {
     return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-secondary rounded-lg shadow-inner">
        <Hourglass className="w-16 h-16 text-primary mb-4 animate-spin" />
        <h3 className="text-xl font-semibold mb-2">ID Under Review</h3>
        <p className="text-muted-foreground">Your Student ID is currently being reviewed. This process can take 24-48 hours. We'll notify you once it's complete.</p>
      </div>
    );   
  }
  
  if (currentStatus === 'id-rejected') {
    return (
     <div className="flex flex-col items-center justify-center p-8 text-center bg-destructive/10 border border-destructive rounded-lg shadow-inner">
       <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
       <h3 className="text-xl font-semibold mb-2 text-destructive">ID Verification Rejected</h3>
       <p className="text-destructive/90 mb-4">Unfortunately, we couldn't verify your submitted ID. This could be due to an unclear image, expired ID, or mismatched information.</p>
       <Button onClick={() => { setStatus('not-verified'); setFeedback(null); }} variant="destructive" className="mb-2">Try Uploading Again</Button>
       <p className="text-sm text-muted-foreground">If issues persist, please contact support.</p>
     </div>
   );   
 }

  return (
    <div className="p-2 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-center">Upload Student ID</h3>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Upload a clear image or PDF of your valid student ID. Ensure all information is legible.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="studentIdFile"
            render={({ field: { onChange, value, ...restField } }) => ( // Destructure to handle FileList
              <FormItem>
                <FormLabel>Student ID (Image or PDF)</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    onChange={(e) => onChange(e.target.files)} // Pass FileList to RHF
                    {...restField}
                    className="bg-input file:text-accent-foreground file:font-medium file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0 hover:file:bg-accent/10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3" disabled={isLoading}>
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</> : <><UploadCloud className="mr-2 h-4 w-4" /> Upload ID for Review</>}
          </Button>
        </form>
      </Form>
    </div>
  );
}

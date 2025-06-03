
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
      <div className="flex flex-col items-center justify-center p-6 text-center bg-secondary rounded-lg shadow-inner">
        <ShieldCheck className="w-12 h-12 text-green-500 mb-3" />
        <h3 className="text-lg font-semibold mb-1.5">Already Verified!</h3>
        <p className="text-xs text-muted-foreground">Your student status is confirmed.</p>
      </div>
    );
  }

  if (currentStatus === 'id-pending') {
     return (
      <div className="flex flex-col items-center justify-center p-6 text-center bg-secondary rounded-lg shadow-inner">
        <Hourglass className="w-12 h-12 text-primary mb-3 animate-spin" />
        <h3 className="text-lg font-semibold mb-1.5">ID Under Review</h3>
        <p className="text-xs text-muted-foreground">Your Student ID is currently being reviewed. This process can take 24-48 hours. We'll notify you once it's complete.</p>
      </div>
    );   
  }
  
  if (currentStatus === 'id-rejected') {
    return (
     <div className="flex flex-col items-center justify-center p-6 text-center bg-destructive/10 border border-destructive rounded-lg shadow-inner">
       <AlertTriangle className="w-12 h-12 text-destructive mb-3" />
       <h3 className="text-lg font-semibold mb-1.5 text-destructive">ID Verification Rejected</h3>
       <p className="text-destructive/90 text-xs mb-3">Unfortunately, we couldn't verify your submitted ID. This could be due to an unclear image, expired ID, or mismatched information.</p>
       <Button onClick={() => { setStatus('not-verified'); setFeedback(null); }} variant="destructive" size="sm" className="mb-1.5 text-xs">Try Uploading Again</Button>
       <p className="text-xs text-muted-foreground">If issues persist, please contact support.</p>
     </div>
   );   
 }

  return (
    <div className="p-1 rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-center">Upload Student ID</h3>
      <p className="text-xs text-muted-foreground mb-5 text-center">
        Upload a clear image or PDF of your valid student ID. Ensure all information is legible.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="studentIdFile"
            render={({ field: { onChange, value, ...restField } }) => ( // Destructure to handle FileList
              <FormItem>
                <FormLabel className="text-sm">Student ID (Image or PDF)</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept={ACCEPTED_IMAGE_TYPES.join(",")}
                    onChange={(e) => onChange(e.target.files)} // Pass FileList to RHF
                    {...restField}
                    className="bg-input file:text-accent-foreground file:font-medium file:mr-3 file:py-1.5 file:px-3 file:rounded-l-md file:border-0 hover:file:bg-accent/10 text-sm"
                  />
                </FormControl>
                <FormMessage className="text-xs"/>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-2.5 text-sm" disabled={isLoading} size="sm">
            {isLoading ? <><Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> Uploading...</> : <><UploadCloud className="mr-1.5 h-3.5 w-3.5" /> Upload ID for Review</>}
          </Button>
        </form>
      </Form>
    </div>
  );
}

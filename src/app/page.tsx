
"use client";

import GracePeriodCard from '@/components/grace-period-card';
import VerificationTabs from '@/components/verification-tabs';
import { ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from 'react';

interface University {
  value: string;
  label: string;
}

interface UniversityGroup {
  label: string;
  universities: University[];
}

const universityData: UniversityGroup[] = [
  {
    label: "National Universities (State Universities)",
    universities: [
      { value: "uoc", label: "University of Colombo (UOC)" },
      { value: "uop", label: "University of Peradeniya (UOP)" },
      { value: "usjp", label: "University of Sri Jayewardenepura (USJP)" },
      { value: "kelaniya", label: "University of Kelaniya" },
      { value: "moratuwa", label: "University of Moratuwa" },
      { value: "jaffna", label: "University of Jaffna" },
      { value: "ruhuna", label: "University of Ruhuna" },
      { value: "eusl", label: "Eastern University, Sri Lanka (EUSL)" },
      { value: "seusl", label: "South Eastern University of Sri Lanka (SEUSL)" },
      { value: "rusl", label: "Rajarata University of Sri Lanka (RUSL)" },
      { value: "susl", label: "Sabaragamuwa University of Sri Lanka (SUSL)" },
      { value: "wusl", label: "Wayamba University of Sri Lanka (WUSL)" },
      { value: "uwu", label: "Uva Wellassa University (UWU)" },
      { value: "uvpa", label: "University of the Visual & Performing Arts (UVPA)" },
      { value: "ousl", label: "Open University of Sri Lanka (OUSL)" },
      { value: "kdu", label: "General Sir John Kotelawala Defence University (KDU)" },
    ]
  },
  {
    label: "Other Degree-Awarding Institutions (Recognized by UGC)",
    universities: [
      { value: "bpu", label: "Buddhist and Pali University of Sri Lanka" },
      { value: "univotec", label: "University of Vocational Technology (UNIVOTEC)" },
      { value: "sliit", label: "Sri Lanka Institute of Information Technology (SLIIT)" },
      { value: "nibm", label: "National Institute of Business Management (NIBM)" },
      { value: "sripalee", label: "Sri Palee Campus (Affiliated to UOC)" },
      { value: "oceanuni_trinco", label: "Ocean University of Sri Lanka (Trincomalee Campus)" },
    ]
  },
  {
    label: "Institutes with University Status (Specialized)",
    universities: [
      { value: "gwuim", label: "Gampaha Wickramarachchi University of Indigenous Medicine" },
      { value: "svias", label: "Swami Vipulananda Institute of Aesthetic Studies (Affiliated to EUSL)" },
    ]
  },
  {
    label: "Private Universities & Institutions (UGC-Approved)",
    universities: [
      { value: "nsbm", label: "NSBM Green University" },
      { value: "iit", label: "Informatics Institute of Technology (IIT)" },
      { value: "cinec", label: "CINEC Campus" },
      { value: "iihs", label: "International Institute of Health Sciences (IIHS)" },
    ]
  }
];


export default function HomePage() {
  const gracePeriodEndDate = new Date();
  gracePeriodEndDate.setDate(gracePeriodEndDate.getDate() + 21); 

  const [selectedUniversity, setSelectedUniversity] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-6 sm:py-10 px-4">
      <header className="mb-6 sm:mb-10 text-center">
        <div className="flex items-center justify-center mb-2">
          <ShieldCheck className="h-8 w-8 sm:h-10 sm:w-10 text-primary animate-pulse" />
          <h1 className="text-3xl sm:text-4xl font-headline ml-2.5 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            UniStudent
          </h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Secure &amp; Seamless Student Verification
        </p>
      </header>
      
      <main className="w-full max-w-xl space-y-6">
        <GracePeriodCard endDate={gracePeriodEndDate} />
        
        <Card className="w-full shadow-lg border-border/40">
          <CardHeader className="pb-3 pt-4">
            <CardTitle className="text-xl text-center font-headline text-primary">Select Your University</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-5">
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select your university" />
              </SelectTrigger>
              <SelectContent>
                {universityData.map((group) => (
                  <SelectGroup key={group.label}>
                    <SelectLabel className="text-xs">{group.label}</SelectLabel>
                    {group.universities.map((uni) => (
                      <SelectItem key={uni.value} value={uni.value} className="text-sm">
                        {uni.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
            {selectedUniversity && (
              <p className="mt-3 text-xs text-muted-foreground text-center">
                You selected: {universityData.flatMap(g => g.universities).find(u => u.value === selectedUniversity)?.label || 'N/A'}
              </p>
            )}
          </CardContent>
        </Card>

        <VerificationTabs />
      </main>

      <footer className="mt-10 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} UniStudent. All rights reserved.</p>
        <p>Trust. Security. Verification.</p>
      </footer>
    </div>
  );
}


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

        <Card className="w-full shadow-xl border-border/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl text-center font-headline text-primary">Select Your University</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger className="w-full text-base md:text-sm">
                <SelectValue placeholder="Select your university" />
              </SelectTrigger>
              <SelectContent>
                {universityData.map((group) => (
                  <SelectGroup key={group.label}>
                    <SelectLabel>{group.label}</SelectLabel>
                    {group.universities.map((uni) => (
                      <SelectItem key={uni.value} value={uni.value}>
                        {uni.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
            {selectedUniversity && (
              <p className="mt-4 text-sm text-muted-foreground text-center">
                You selected: {universityData.flatMap(g => g.universities).find(u => u.value === selectedUniversity)?.label || 'N/A'}
              </p>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="mt-12 text-center text-xs sm:text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} UniStudent. All rights reserved.</p>
        <p>Trust. Security. Verification.</p>
      </footer>
    </div>
  );
}

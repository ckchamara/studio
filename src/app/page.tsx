
"use client";

import GracePeriodCard from '@/components/grace-period-card';
import VerificationTabs from '@/components/verification-tabs';
import { ShieldCheck, ShieldAlert } from 'lucide-react';
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
import { useState, useEffect } from 'react';

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
  const [gracePeriodEndDate, setGracePeriodEndDate] = useState<Date | null>(null);
  const [selectedUniversity, setSelectedUniversity] = useState<string | undefined>(undefined);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 21);
    setGracePeriodEndDate(date);
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-4 sm:py-8 px-4">
      <header className="mb-4 sm:mb-8 text-center">
        <div className="flex items-center justify-center mb-1.5">
          <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-pulse" />
          <h1 className="text-2xl sm:text-3xl font-headline ml-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            UniStudent
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Secure &amp; Seamless Student Verification
        </p>
      </header>
      
      <main className="w-full max-w-lg space-y-4">
        {gracePeriodEndDate ? (
          <GracePeriodCard endDate={gracePeriodEndDate} />
        ) : (
          <Card className="bg-card border-accent shadow-md animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
              <CardTitle className="text-sm font-medium text-accent-foreground">Trial Period Reminder</CardTitle>
              <ShieldAlert className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent className="px-3 pb-2 pt-0.5">
              <p className="text-base h-5 bg-muted-foreground/20 rounded w-3/4"></p>
              <p className="text-xs text-muted-foreground mt-0.5 h-3 bg-muted-foreground/10 rounded w-full"></p>
            </CardContent>
          </Card>
        )}
        
        <Card className="w-full shadow-md border-border/40">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-base text-center font-headline text-primary">Select Your University</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <Select value={selectedUniversity} onValueChange={setSelectedUniversity}>
              <SelectTrigger className="w-full text-xs">
                <SelectValue placeholder="Select your university" />
              </SelectTrigger>
              <SelectContent>
                {universityData.map((group) => (
                  <SelectGroup key={group.label}>
                    <SelectLabel className="text-xs">{group.label}</SelectLabel>
                    {group.universities.map((uni) => (
                      <SelectItem key={uni.value} value={uni.value} className="text-xs">
                        {uni.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
            {selectedUniversity && (
              <p className="mt-2 text-xs text-muted-foreground text-center">
                You selected: {universityData.flatMap(g => g.universities).find(u => u.value === selectedUniversity)?.label || 'N/A'}
              </p>
            )}
          </CardContent>
        </Card>

        <VerificationTabs />
      </main>

      <footer className="mt-8 text-center text-xs text-muted-foreground">
        {currentYear && <p>&copy; {currentYear} UniStudent. All rights reserved.</p>}
        {!currentYear && <p className="h-4 bg-muted-foreground/20 rounded w-1/2 mx-auto mb-1"></p>}
        <p>Trust. Security. Verification.</p>
      </footer>
    </div>
  );
}


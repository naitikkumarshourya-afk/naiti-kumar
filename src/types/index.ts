export type CareerMode = 'now' | 'future';

export type WorkMode = 'Remote' | 'WFH' | 'Hybrid' | 'On-site';

export type JobType = 'Internship' | 'Full-time' | 'Part-time' | 'Contract';

export type JobCategory = 
  | 'Cybersecurity'
  | 'SOC Analyst'
  | 'Penetration Testing'
  | 'SDE / Full Stack'
  | 'Cloud & DevOps'
  | 'Network Security'
  | 'AI / ML Security';

export type WorkloadPreference = 'Light' | 'Balanced' | 'Intensive';

export type WorkingHours = 'Flexible' | 'Fixed Day' | 'College Hours (15-20h)' | 'Night Shifts';

export type WlbStatus = 'Verified High' | 'Verified Good' | 'Average' | 'Not verified';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type JoiningTime = 'Immediate' | 'Within 1 Month' | 'Summer Break' | 'After Graduation';

export type EmploymentType = 'Permanent' | 'Temporary' | 'Contract';

export interface Job {
  id: string;
  title: string;
  company: string;
  companyId: string;
  companyLogo: string;
  location: string;
  city: 'Greater Noida' | 'Noida' | 'Delhi NCR' | 'Bangalore' | 'Gurgaon' | 'Hyderabad' | 'Remote';
  workMode: WorkMode;
  careerMode: CareerMode;
  jobType: JobType;
  salaryDisplay: string;
  salaryMinLpa: number; // in LPA (for stipend, converted approx or represented)
  salaryPeriod: 'month' | 'lpa';
  rawSalaryAmount: number;
  experienceLevel: 'Fresher / Student' | '0-1 years' | '1-3 years' | '3+ years';
  category: JobCategory;
  workload: WorkloadPreference;
  workloadNote: string;
  workingHours: WorkingHours;
  wlbScore: number;
  wlbStatus: WlbStatus;
  skillLevel: SkillLevel;
  skillsRequired: string[];
  joiningTime: JoiningTime;
  employmentType: EmploymentType;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  datePosted: string;
  deadline: string;
  applyUrl: string;
  isDemoData: boolean;
  matchScoreForStudent?: number; // Calculated match percentage for 1st year CSE student
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  industry: 'Cybersecurity Specialized' | 'Product / Big Tech' | 'Startup / Unicorn' | 'IT Services & Consulting' | 'FinTech / AI';
  headquarters: string;
  officesInIndia: string[];
  size: string;
  avgFresherSalary: string;
  wlbScore: number;
  wlbRatingCount: number;
  openingsCount: number;
  description: string;
  techStack: string[];
  benefits: string[];
  isHiringFreshers: boolean;
  website: string;
  cultureRating: {
    workLifeBalance: number;
    careerGrowth: number;
    mentorship: number;
    studentFriendly: number;
  };
}

export type ApplicationStatus = 'Interested' | 'Saved' | 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface TrackedApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  location: string;
  salary: string;
  status: ApplicationStatus;
  appliedDate: string;
  lastUpdated: string;
  interviewDate?: string;
  deadline?: string;
  notes: string;
  contactPerson?: string;
}

export interface FilterState {
  searchQuery: string;
  locationQuery: string;
  careerMode: CareerMode | 'all';
  workModes: WorkMode[];
  jobTypes: JobType[];
  categories: JobCategory[];
  salaryMinLpa: number;
  salaryMaxLpa: number;
  experienceLevels: string[];
  workloads: WorkloadPreference[];
  workingHours: WorkingHours[];
  wlbStatuses: WlbStatus[];
  skillLevels: SkillLevel[];
  joiningTimes: JoiningTime[];
  employmentTypes: EmploymentType[];
  companyQuery: string;
  onlyStudentFriendly: boolean;
  sortBy: 'latest' | 'salary-high' | 'salary-low' | 'match' | 'wlb';
}

export interface StudentProfile {
  name: string;
  education: string;
  specialization: string;
  year: string;
  collegeLocation: string;
  skills: string[];
  targetRoles: string[];
  availabilityHoursPerWeek: number;
  preferredWorkMode: WorkMode[];
}

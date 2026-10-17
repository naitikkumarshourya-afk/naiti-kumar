/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StudentProfileBanner } from './components/StudentProfileBanner';
import { FiltersSidebar } from './components/FiltersSidebar';
import { JobCard } from './components/JobCard';
import { JobDetailsModal } from './components/JobDetailsModal';
import { CompanyDirectory } from './components/CompanyDirectory';
import { ApplicationTracker } from './components/ApplicationTracker';
import { CyberRoadmap } from './components/CyberRoadmap';
import { AICareerAdvisor } from './components/AICareerAdvisor';
import { SavedJobsModal } from './components/SavedJobsModal';

import { mockJobs } from './data/mockJobs';
import { mockCompanies } from './data/mockCompanies';
import { 
  Job, 
  FilterState, 
  CareerMode, 
  TrackedApplication, 
  ApplicationStatus 
} from './types';

import { 
  ArrowUpDown, 
  SlidersHorizontal, 
  Briefcase, 
  X, 
  Sparkles,
  MapPin,
  Clock,
  RotateCcw
} from 'lucide-react';

const initialFilters: FilterState = {
  searchQuery: '',
  locationQuery: '',
  careerMode: 'now', // Default to student jobs for 1st year B.Tech
  workModes: [],
  jobTypes: [],
  categories: [],
  salaryMinLpa: 0,
  salaryMaxLpa: 100,
  experienceLevels: [],
  workloads: [],
  workingHours: [],
  wlbStatuses: [],
  skillLevels: [],
  joiningTimes: [],
  employmentTypes: [],
  companyQuery: '',
  onlyStudentFriendly: false,
  sortBy: 'match',
};

// Seed sample tracked application for realistic first experience
const initialSeedApplications: TrackedApplication[] = [
  {
    id: 'track-01',
    jobId: 'job-now-01',
    jobTitle: 'Cybersecurity Analyst Intern (SOC L1 Trainee)',
    company: 'TAC Security (ESOF)',
    location: 'Noida (Sector 62) / Greater Noida Friendly',
    salary: '₹25,000 - ₹35,000 / mo',
    status: 'Interview',
    appliedDate: 'Oct 10, 2026',
    lastUpdated: 'Oct 12, 2026',
    interviewDate: 'Oct 18, 3:30 PM (Google Meet)',
    notes: 'Completed technical assignment on Wireshark packet capture analysis. Round 2 with SOC Lead.'
  },
  {
    id: 'track-02',
    jobId: 'job-now-04',
    jobTitle: 'Student Security Ambassador & Research Intern',
    company: 'Quick Heal Technologies',
    location: 'Noida (Sector 62)',
    salary: '₹20,000 - ₹28,000 / mo',
    status: 'Applied',
    appliedDate: 'Oct 12, 2026',
    lastUpdated: 'Oct 12, 2026',
    notes: 'Submitted via college placement coordinator. Highlighted Linux and C++ coursework.'
  },
  {
    id: 'track-03',
    jobId: 'job-future-01',
    jobTitle: 'Associate Security Engineer (Cloud & Detection)',
    company: 'Palo Alto Networks',
    location: 'Bangalore / Gurgaon / Hybrid',
    salary: '₹22 - ₹30 LPA',
    status: 'Saved',
    appliedDate: 'Oct 8, 2026',
    lastUpdated: 'Oct 8, 2026',
    notes: 'Long term dream company for 4th year campus drives. Requirements: AWS Security + Python.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'companies' | 'tracker' | 'roadmap' | 'ai-advisor'>('jobs');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  // Real-time TinyFish Live Jobs State
  const [liveJobs, setLiveJobs] = useState<Job[]>([]);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  // Modals
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<Job | null>(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Persistence: Saved Jobs
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('careerpilot_saved_jobs');
      return stored ? JSON.parse(stored) : ['job-now-01', 'job-future-04'];
    } catch {
      return ['job-now-01', 'job-future-04'];
    }
  });

  // Fetch Live Jobs via TinyFish Search Proxy
  const fetchLiveJobs = async (customQuery?: string) => {
    setIsLoadingLive(true);
    try {
      const queryParam = customQuery || (filters.searchQuery ? `${filters.searchQuery} cybersecurity internship India` : 'cybersecurity internship greater noida noida');
      const res = await fetch(`/api/live-jobs?query=${encodeURIComponent(queryParam)}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.jobs) && data.jobs.length > 0) {
          setLiveJobs(data.jobs);
        }
      }
    } catch (err) {
      console.warn('Live jobs fetch warning (using cached/fallback):', err);
    } finally {
      setIsLoadingLive(false);
    }
  };

  // Auto-fetch real-time jobs on mount
  useEffect(() => {
    fetchLiveJobs('cybersecurity internship greater noida noida');
  }, []);

  // Persistence: Applications Tracker
  const [applications, setApplications] = useState<TrackedApplication[]>(() => {
    try {
      const stored = localStorage.getItem('careerpilot_applications');
      return stored ? JSON.parse(stored) : initialSeedApplications;
    } catch {
      return initialSeedApplications;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('careerpilot_saved_jobs', JSON.stringify(savedJobIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedJobIds]);

  useEffect(() => {
    try {
      localStorage.setItem('careerpilot_applications', JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  // Toggle Save / Bookmark
  const handleToggleSave = (job: Job) => {
    setSavedJobIds(prev => 
      prev.includes(job.id) ? prev.filter(id => id !== job.id) : [...prev, job.id]
    );
  };

  // Quick Track / Add to Tracker
  const handleQuickTrack = (job: Job) => {
    const existing = applications.find(a => a.jobId === job.id);
    if (existing) {
      // Toggle or show toast
      setActiveTab('tracker');
      return;
    }

    const newApp: TrackedApplication = {
      id: `track-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      salary: job.salaryDisplay,
      status: 'Saved',
      appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      notes: `Added from CareerPilot explorer. Workload: ${job.workload}.`,
    };

    setApplications(prev => [newApp, ...prev]);
  };

  // Direct Apply & Track
  const handleApplyOrTrack = (job: Job, status: ApplicationStatus) => {
    const existingIndex = applications.findIndex(a => a.jobId === job.id);
    if (existingIndex >= 0) {
      const updated = [...applications];
      updated[existingIndex] = {
        ...updated[existingIndex],
        status,
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      setApplications(updated);
    } else {
      const newApp: TrackedApplication = {
        id: `track-${Date.now()}`,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        location: job.location,
        salary: job.salaryDisplay,
        status,
        appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        notes: `Application initiated on CareerPilot portal.`,
      };
      setApplications(prev => [newApp, ...prev]);
    }
  };

  // Update Status in Tracker
  const handleUpdateApplicationStatus = (id: string, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus, lastUpdated: new Date().toLocaleDateString('en-US') } : a));
  };

  // Update Notes & Interview Date
  const handleUpdateApplicationNotes = (id: string, notes: string, interviewDate?: string) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, notes, interviewDate, lastUpdated: new Date().toLocaleDateString('en-US') } : a));
  };

  // Delete Application
  const handleDeleteApplication = (id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
  };

  // Add Custom Manual Application
  const handleAddCustomApplication = (appData: Omit<TrackedApplication, 'id' | 'lastUpdated'>) => {
    const newApp: TrackedApplication = {
      ...appData,
      id: `custom-${Date.now()}`,
      lastUpdated: new Date().toLocaleDateString('en-US'),
    };
    setApplications(prev => [newApp, ...prev]);
  };

  // Combine live jobs with curated dataset
  const combinedJobs = useMemo(() => {
    if (showLiveOnly) return liveJobs;
    // Put live jobs first if any, followed by curated mock jobs
    const seen = new Set<string>();
    const list: Job[] = [];
    for (const j of [...liveJobs, ...mockJobs]) {
      if (!seen.has(j.id)) {
        seen.add(j.id);
        list.push(j);
      }
    }
    return list;
  }, [liveJobs, showLiveOnly]);

  // Filter Jobs with ultra-fast Memoization
  const filteredJobs = useMemo(() => {
    return combinedJobs.filter(job => {
      // 1. Career Mode
      if (filters.careerMode !== 'all' && job.careerMode !== filters.careerMode) {
        return false;
      }

      // 2. Search query (Title, Company, Skills, Description)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesSkills = job.skillsRequired.some(s => s.toLowerCase().includes(query));
        const matchesDesc = job.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesDesc) {
          return false;
        }
      }

      // 3. Location filter
      if (filters.locationQuery) {
        const loc = filters.locationQuery.toLowerCase();
        const matchesCity = job.city.toLowerCase().includes(loc) || job.location.toLowerCase().includes(loc);
        if (!matchesCity) return false;
      }

      // 4. Company Query
      if (filters.companyQuery) {
        if (!job.company.toLowerCase().includes(filters.companyQuery.toLowerCase())) {
          return false;
        }
      }

      // 5. Work Mode
      if (filters.workModes.length > 0 && !filters.workModes.includes(job.workMode)) {
        return false;
      }

      // 6. Job Type
      if (filters.jobTypes.length > 0 && !filters.jobTypes.includes(job.jobType)) {
        return false;
      }

      // 7. Categories
      if (filters.categories.length > 0 && !filters.categories.includes(job.category)) {
        return false;
      }

      // 8. Workload
      if (filters.workloads.length > 0 && !filters.workloads.includes(job.workload)) {
        return false;
      }

      // 9. Work-Life Balance
      if (filters.wlbStatuses.length > 0 && !filters.wlbStatuses.includes(job.wlbStatus)) {
        return false;
      }

      // 10. Student Friendly Workload toggle
      if (filters.onlyStudentFriendly && job.workload !== 'Light') {
        return false;
      }

      // 11. Skill Level
      if (filters.skillLevels.length > 0 && !filters.skillLevels.includes(job.skillLevel)) {
        return false;
      }

      // 12. Joining Time
      if (filters.joiningTimes.length > 0 && !filters.joiningTimes.includes(job.joiningTime)) {
        return false;
      }

      // 13. Working Hours
      if (filters.workingHours.length > 0 && !filters.workingHours.includes(job.workingHours)) {
        return false;
      }

      // 14. Salary Range (Min / Max LPA)
      if (filters.salaryMinLpa > 0 && job.salaryMinLpa < filters.salaryMinLpa) {
        return false;
      }
      if (filters.salaryMaxLpa < 100 && job.salaryMinLpa > filters.salaryMaxLpa) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'salary-high') {
        return b.salaryMinLpa - a.salaryMinLpa;
      }
      if (filters.sortBy === 'salary-low') {
        return a.salaryMinLpa - b.salaryMinLpa;
      }
      if (filters.sortBy === 'wlb') {
        return b.wlbScore - a.wlbScore;
      }
      if (filters.sortBy === 'match') {
        return (b.matchScoreForStudent || 0) - (a.matchScoreForStudent || 0);
      }
      return 0; // 'latest'
    });
  }, [combinedJobs, filters]);

  const nowCount = useMemo(() => combinedJobs.filter(j => j.careerMode === 'now').length, [combinedJobs]);
  const futureCount = useMemo(() => combinedJobs.filter(j => j.careerMode === 'future').length, [combinedJobs]);
  const savedJobs = useMemo(() => combinedJobs.filter(j => savedJobIds.includes(j.id)), [combinedJobs, savedJobIds]);

  const handleResetFilters = () => {
    setFilters({
      ...initialFilters,
      careerMode: filters.careerMode, // preserve currently selected career mode
    });
    setShowLiveOnly(false);
  };

  const handleSelectCompanyFromDirectory = (companyName: string) => {
    setFilters(prev => ({
      ...prev,
      companyQuery: companyName,
      searchQuery: '',
      careerMode: 'all',
    }));
    setActiveTab('jobs');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedJobsCount={savedJobs.length}
        trackedApplicationsCount={applications.length}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
      />

      {/* Student Banner with Dual Career Mode Switcher */}
      {activeTab === 'jobs' && (
        <StudentProfileBanner
          careerMode={filters.careerMode}
          setCareerMode={(mode) => setFilters(prev => ({ ...prev, careerMode: mode }))}
          onlyStudentFriendly={filters.onlyStudentFriendly}
          setOnlyStudentFriendly={(val) => setFilters(prev => ({ ...prev, onlyStudentFriendly: val }))}
          selectedLocation={filters.locationQuery}
          setSelectedLocation={(loc) => setFilters(prev => ({ ...prev, locationQuery: loc }))}
          nowCount={nowCount}
          futureCount={futureCount}
          totalFilteredCount={filteredJobs.length}
          onFetchLiveJobs={() => fetchLiveJobs()}
          isLoadingLive={isLoadingLive}
          liveJobsCount={liveJobs.length}
          showLiveOnly={showLiveOnly}
          setShowLiveOnly={setShowLiveOnly}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: JOBS EXPLORER */}
        {activeTab === 'jobs' && (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Desktop Filters Sidebar (12+ dimensions) */}
            <aside className="hidden lg:block w-72 shrink-0 sticky top-20">
              <FiltersSidebar
                filters={filters}
                setFilters={setFilters}
                onResetFilters={handleResetFilters}
                totalResults={filteredJobs.length}
              />
            </aside>

            {/* Mobile Filter Toggle Drawer Button */}
            <div className="lg:hidden w-full flex items-center justify-between pb-2">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="px-3.5 py-2 text-xs font-bold rounded-lg bg-white border border-slate-200 text-slate-800 shadow-xs flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <span>Filters ({filteredJobs.length} matches)</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  className="bg-transparent font-semibold text-slate-800 focus:outline-none"
                >
                  <option value="match">Best Match</option>
                  <option value="latest">Latest</option>
                  <option value="salary-high">Salary: High to Low</option>
                  <option value="salary-low">Salary: Low to High</option>
                  <option value="wlb">Best WLB Rating</option>
                </select>
              </div>
            </div>

            {/* Mobile Filter Modal */}
            {mobileFilterOpen && (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 p-4 flex items-center justify-center lg:hidden">
                <div className="bg-white rounded-2xl max-w-md w-full p-4 max-h-[85vh] overflow-y-auto relative">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                    <h3 className="font-bold text-sm">Filters</h3>
                    <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-400">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FiltersSidebar
                    filters={filters}
                    setFilters={setFilters}
                    onResetFilters={handleResetFilters}
                    totalResults={filteredJobs.length}
                  />
                  <div className="mt-4 pt-3 border-t flex justify-end">
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white"
                    >
                      Show {filteredJobs.length} Results
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Job Listings Column */}
            <div className="flex-1 w-full space-y-4">
              
              {/* Controls bar: active chips and sort dropdown */}
              <div className="hidden lg:flex items-center justify-between bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
                {/* Active Filter Chips */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-semibold text-slate-500">
                    Showing <strong className="text-slate-900">{filteredJobs.length}</strong> roles
                  </span>

                  {filters.companyQuery && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium text-[11px]">
                      Company: {filters.companyQuery}
                      <button onClick={() => setFilters(prev => ({ ...prev, companyQuery: '' }))} className="hover:text-rose-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {filters.searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium text-[11px]">
                      Search: "{filters.searchQuery}"
                      <button onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))} className="hover:text-rose-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {filters.workModes.map(m => (
                    <span key={m} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium text-[11px]">
                      {m}
                      <button onClick={() => setFilters(prev => ({ ...prev, workModes: prev.workModes.filter(x => x !== m) }))} className="hover:text-rose-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}

                  {filters.categories.map(c => (
                    <span key={c} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium text-[11px]">
                      {c}
                      <button onClick={() => setFilters(prev => ({ ...prev, categories: prev.categories.filter(x => x !== c) }))} className="hover:text-rose-600">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 text-slate-600 shrink-0">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">Sort by:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                    className="font-bold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="match">Match for 1st Year CSE</option>
                    <option value="latest">Latest Posted</option>
                    <option value="salary-high">Salary / Stipend (High to Low)</option>
                    <option value="salary-low">Salary / Stipend (Low to High)</option>
                    <option value="wlb">Work-Life Balance Score</option>
                  </select>
                </div>
              </div>

              {/* Jobs Cards Grid */}
              {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
                  <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="font-extrabold text-slate-900 text-base">No matching jobs found</h3>
                  <p className="text-xs max-w-sm mx-auto">
                    Try clearing some of your filters or broadening your search parameters to view more opportunities.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredJobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isSaved={savedJobIds.includes(job.id)}
                      isTracked={applications.some(a => a.jobId === job.id)}
                      onToggleSave={handleToggleSave}
                      onOpenDetails={(j) => setSelectedJobForDetails(j)}
                      onQuickTrack={handleQuickTrack}
                      onApply={(j) => setSelectedJobForDetails(j)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: COMPANY DIRECTORY */}
        {activeTab === 'companies' && (
          <CompanyDirectory
            companies={mockCompanies}
            jobs={mockJobs}
            onSelectCompanyFilter={handleSelectCompanyFromDirectory}
          />
        )}

        {/* TAB 3: APPLICATION TRACKER */}
        {activeTab === 'tracker' && (
          <ApplicationTracker
            applications={applications}
            onUpdateStatus={handleUpdateApplicationStatus}
            onUpdateNotes={handleUpdateApplicationNotes}
            onDeleteApplication={handleDeleteApplication}
            onAddCustomApplication={handleAddCustomApplication}
          />
        )}

        {/* TAB 4: 4-YEAR CYBER ROADMAP */}
        {activeTab === 'roadmap' && (
          <CyberRoadmap />
        )}

        {/* TAB 5: AI CAREER ADVISOR */}
        {activeTab === 'ai-advisor' && (
          <AICareerAdvisor
            jobs={mockJobs}
            onSelectJob={(job) => {
              setSelectedJobForDetails(job);
              setActiveTab('jobs');
            }}
          />
        )}
      </main>

      {/* Job Details Modal Drawer */}
      <JobDetailsModal
        job={selectedJobForDetails}
        onClose={() => setSelectedJobForDetails(null)}
        isSaved={selectedJobForDetails ? savedJobIds.includes(selectedJobForDetails.id) : false}
        onToggleSave={handleToggleSave}
        onApplyOrTrack={handleApplyOrTrack}
      />

      {/* Bookmarked Jobs Modal */}
      <SavedJobsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedJobs={savedJobs}
        onRemoveSaved={handleToggleSave}
        onOpenDetails={(job) => setSelectedJobForDetails(job)}
      />
    </div>
  );
}

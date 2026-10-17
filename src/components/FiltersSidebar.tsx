import React, { useState } from 'react';
import { 
  Filter, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  IndianRupee, 
  Briefcase, 
  Laptop, 
  ShieldAlert, 
  Clock, 
  Award, 
  Calendar,
  Check,
  Building
} from 'lucide-react';
import { 
  FilterState, 
  WorkMode, 
  JobType, 
  JobCategory, 
  WorkloadPreference, 
  WorkingHours, 
  WlbStatus, 
  SkillLevel, 
  JoiningTime, 
  EmploymentType 
} from '../types';

interface FiltersSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onResetFilters: () => void;
  totalResults: number;
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filters,
  setFilters,
  onResetFilters,
  totalResults,
}) => {
  // Collapsible sections state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    salary: true,
    workMode: true,
    jobType: true,
    category: true,
    workload: true,
    wlb: true,
    experience: false,
    hours: false,
    skills: false,
    joining: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleWorkModeToggle = (mode: WorkMode) => {
    setFilters(prev => ({
      ...prev,
      workModes: prev.workModes.includes(mode)
        ? prev.workModes.filter(m => m !== mode)
        : [...prev.workModes, mode]
    }));
  };

  const handleJobTypeToggle = (type: JobType) => {
    setFilters(prev => ({
      ...prev,
      jobTypes: prev.jobTypes.includes(type)
        ? prev.jobTypes.filter(t => t !== type)
        : [...prev.jobTypes, type]
    }));
  };

  const handleCategoryToggle = (cat: JobCategory) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const handleWorkloadToggle = (wl: WorkloadPreference) => {
    setFilters(prev => ({
      ...prev,
      workloads: prev.workloads.includes(wl)
        ? prev.workloads.filter(w => w !== wl)
        : [...prev.workloads, wl]
    }));
  };

  const handleWlbToggle = (status: WlbStatus) => {
    setFilters(prev => ({
      ...prev,
      wlbStatuses: prev.wlbStatuses.includes(status)
        ? prev.wlbStatuses.filter(s => s !== status)
        : [...prev.wlbStatuses, status]
    }));
  };

  const handleSkillLevelToggle = (skill: SkillLevel) => {
    setFilters(prev => ({
      ...prev,
      skillLevels: prev.skillLevels.includes(skill)
        ? prev.skillLevels.filter(s => s !== skill)
        : [...prev.skillLevels, skill]
    }));
  };

  const handleJoiningTimeToggle = (jt: JoiningTime) => {
    setFilters(prev => ({
      ...prev,
      joiningTimes: prev.joiningTimes.includes(jt)
        ? prev.joiningTimes.filter(j => j !== jt)
        : [...prev.joiningTimes, jt]
    }));
  };

  const handleWorkingHoursToggle = (wh: WorkingHours) => {
    setFilters(prev => ({
      ...prev,
      workingHours: prev.workingHours.includes(wh)
        ? prev.workingHours.filter(w => w !== wh)
        : [...prev.workingHours, wh]
    }));
  };

  // Pre-configured salary presets
  const salaryPresets = [
    { label: 'All Ranges', min: 0, max: 100 },
    { label: '₹3 – ₹6 LPA (Internships / Trainee)', min: 0, max: 6 },
    { label: '₹6 – ₹12 LPA (Fresher Junior)', min: 6, max: 12 },
    { label: '₹12 – ₹20 LPA (Tier-1 Cyber/SDE)', min: 12, max: 20 },
    { label: '₹20 LPA+ (Top Unicorn & MNC)', min: 20, max: 100 },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-indigo-600" />
          <h2 className="font-bold text-slate-900 text-sm">Advanced Filters</h2>
          <span className="text-xs text-slate-500 font-medium">({totalResults} matches)</span>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-slate-500 hover:text-indigo-600 font-medium flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Search Query */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          Role, Company, or Skill
        </label>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="e.g. SOC, Python, Palo Alto..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* 2. Salary Range (INR) */}
      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={() => toggleSection('salary')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-900 hover:text-indigo-600"
        >
          <span className="flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-slate-500" />
            Salary & Stipend Range
          </span>
          {openSections.salary ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {openSections.salary && (
          <div className="mt-2 space-y-2">
            {salaryPresets.map((preset, idx) => {
              const isSelected = filters.salaryMinLpa === preset.min && filters.salaryMaxLpa === preset.max;
              return (
                <label key={idx} className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 hover:text-slate-900">
                  <input
                    type="radio"
                    name="salaryRange"
                    checked={isSelected}
                    onChange={() => setFilters(prev => ({ ...prev, salaryMinLpa: preset.min, salaryMaxLpa: preset.max }))}
                    className="w-3.5 h-3.5 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                  />
                  <span>{preset.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Work Mode */}
      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={() => toggleSection('workMode')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-900 hover:text-indigo-600"
        >
          <span className="flex items-center gap-1.5">
            <Laptop className="w-3.5 h-3.5 text-slate-500" />
            Work Mode
          </span>
          {openSections.workMode ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {openSections.workMode && (
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {(['Remote', 'WFH', 'Hybrid', 'On-site'] as WorkMode[]).map((mode) => {
              const isChecked = filters.workModes.includes(mode);
              return (
                <button
                  key={mode}
                  onClick={() => handleWorkModeToggle(mode)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border text-left flex items-center justify-between transition-colors ${
                    isChecked
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{mode}</span>
                  {isChecked && <Check className="w-3 h-3 text-indigo-300" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Job Category (Cybersecurity focus) */}
      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-900 hover:text-indigo-600"
        >
          <span className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
            Job Category
          </span>
          {openSections.category ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {openSections.category && (
          <div className="mt-2 space-y-1.5">
            {([
              'Cybersecurity',
              'SOC Analyst',
              'Penetration Testing',
              'SDE / Full Stack',
              'Cloud & DevOps',
              'Network Security',
              'AI / ML Security',
            ] as JobCategory[]).map((cat) => {
              const isChecked = filters.categories.includes(cat);
              return (
                <label key={cat} className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryToggle(cat)}
                    className="w-3.5 h-3.5 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                  />
                  <span>{cat}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Workload Preference */}
      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={() => toggleSection('workload')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-900 hover:text-indigo-600"
        >
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Workload Preference
          </span>
          {openSections.workload ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {openSections.workload && (
          <div className="mt-2 space-y-1.5">
            {[
              { id: 'Light', label: 'Light (College Friendly / Exam Safe)' },
              { id: 'Balanced', label: 'Balanced (Standard 40h)' },
              { id: 'Intensive', label: 'Intensive (Fast-paced startup)' },
            ].map((wl) => {
              const isChecked = filters.workloads.includes(wl.id as WorkloadPreference);
              return (
                <label key={wl.id} className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleWorkloadToggle(wl.id as WorkloadPreference)}
                    className="w-3.5 h-3.5 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                  />
                  <span>{wl.label}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Work-Life Balance Verification */}
      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={() => toggleSection('wlb')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-900 hover:text-indigo-600"
        >
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-slate-500" />
            Work-Life Balance (WLB)
          </span>
          {openSections.wlb ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {openSections.wlb && (
          <div className="mt-2 space-y-1.5">
            {(['Verified High', 'Verified Good', 'Average', 'Not verified'] as WlbStatus[]).map((st) => {
              const isChecked = filters.wlbStatuses.includes(st);
              return (
                <label key={st} className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleWlbToggle(st)}
                    className="w-3.5 h-3.5 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                  />
                  <span>{st}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 7. Job Type */}
      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={() => toggleSection('jobType')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-900 hover:text-indigo-600"
        >
          <span className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-slate-500" />
            Job Type
          </span>
          {openSections.jobType ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {openSections.jobType && (
          <div className="mt-2 space-y-1.5">
            {(['Internship', 'Full-time', 'Part-time', 'Contract'] as JobType[]).map((type) => {
              const isChecked = filters.jobTypes.includes(type);
              return (
                <label key={type} className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleJobTypeToggle(type)}
                    className="w-3.5 h-3.5 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                  />
                  <span>{type}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 8. Skill Level */}
      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={() => toggleSection('skills')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-900 hover:text-indigo-600"
        >
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-slate-500" />
            Skill Requirement
          </span>
          {openSections.skills ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {openSections.skills && (
          <div className="mt-2 space-y-1.5">
            {(['Beginner', 'Intermediate', 'Advanced'] as SkillLevel[]).map((sk) => {
              const isChecked = filters.skillLevels.includes(sk);
              return (
                <label key={sk} className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleSkillLevelToggle(sk)}
                    className="w-3.5 h-3.5 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                  />
                  <span>{sk}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 9. Joining Timeline */}
      <div className="pt-2 border-t border-slate-100">
        <button
          onClick={() => toggleSection('joining')}
          className="w-full flex items-center justify-between py-1 text-xs font-bold text-slate-900 hover:text-indigo-600"
        >
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            Joining Timeline
          </span>
          {openSections.joining ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        {openSections.joining && (
          <div className="mt-2 space-y-1.5">
            {(['Immediate', 'Within 1 Month', 'Summer Break', 'After Graduation'] as JoiningTime[]).map((jt) => {
              const isChecked = filters.joiningTimes.includes(jt);
              return (
                <label key={jt} className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 hover:text-slate-900">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleJoiningTimeToggle(jt)}
                    className="w-3.5 h-3.5 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                  />
                  <span>{jt}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  Zap, 
  TrendingUp, 
  CheckCircle2,
  Globe2,
  RefreshCw
} from 'lucide-react';
import { CareerMode } from '../types';

interface StudentProfileBannerProps {
  careerMode: CareerMode | 'all';
  setCareerMode: (mode: CareerMode | 'all') => void;
  onlyStudentFriendly: boolean;
  setOnlyStudentFriendly: (val: boolean) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  nowCount: number;
  futureCount: number;
  totalFilteredCount: number;
  onFetchLiveJobs: () => void;
  isLoadingLive: boolean;
  liveJobsCount: number;
  showLiveOnly: boolean;
  setShowLiveOnly: (val: boolean) => void;
}

export const StudentProfileBanner: React.FC<StudentProfileBannerProps> = ({
  careerMode,
  setCareerMode,
  onlyStudentFriendly,
  setOnlyStudentFriendly,
  selectedLocation,
  setSelectedLocation,
  nowCount,
  futureCount,
  totalFilteredCount,
  onFetchLiveJobs,
  isLoadingLive,
  liveJobsCount,
  showLiveOnly,
  setShowLiveOnly,
}) => {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        
        {/* Top bar: Persona & Two Career Modes Segmented Control */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-semibold tracking-wider uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                Personalized Career Portal
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Greater Noida / Delhi NCR & Remote
              </span>
              <span className="text-xs text-slate-400">·</span>
              {/* Live TinyFish connection indicator */}
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>TinyFish Agent Live</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Cybersecurity Student Career Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5 max-w-2xl">
              Engineered for 1st Year B.Tech CSE (Cybersecurity) students. Real-time web index connected to Indeed, LinkedIn, Internshala, and leading cybersecurity firms.
            </p>
          </div>

          {/* Segmented Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner self-start lg:self-center">
              <button
                onClick={() => setCareerMode('now')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  careerMode === 'now'
                    ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Jobs For Me Now</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  {nowCount}
                </span>
              </button>

              <button
                onClick={() => setCareerMode('future')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  careerMode === 'future'
                    ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <span>Future Career (₹10-35 LPA)</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                  {futureCount}
                </span>
              </button>

              <button
                onClick={() => setCareerMode('all')}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  careerMode === 'all'
                    ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>All ({nowCount + futureCount})</span>
              </button>
            </div>

            {/* Live Web Fetch Button */}
            <button
              onClick={onFetchLiveJobs}
              disabled={isLoadingLive}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2 shrink-0"
              title="Search live web job openings via TinyFish API"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isLoadingLive ? 'animate-spin' : ''}`} />
              <span>{isLoadingLive ? 'Fetching Live...' : 'Search Live Web'}</span>
            </button>
          </div>
        </div>

        {/* Quick Location & Workload Filter Strip */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Quick Location Presets */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              Quick Region:
            </span>

            {[
              { id: '', label: 'All Locations' },
              { id: 'Greater Noida', label: 'Greater Noida' },
              { id: 'Noida', label: 'Noida / Expressway' },
              { id: 'Delhi NCR', label: 'Delhi NCR' },
              { id: 'Remote', label: 'Remote / WFH' },
              { id: 'Bangalore', label: 'Bangalore' },
            ].map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc.id)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  selectedLocation === loc.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>

          {/* Student Friendly Workload Toggle & Live Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            {liveJobsCount > 0 && (
              <button
                onClick={() => setShowLiveOnly(!showLiveOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  showLiveOnly
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800 ring-1 ring-emerald-300'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live Web Only ({liveJobsCount})</span>
              </button>
            )}

            <button
              onClick={() => setOnlyStudentFriendly(!onlyStudentFriendly)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                onlyStudentFriendly
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 ring-1 ring-emerald-300'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${onlyStudentFriendly ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Light Workload (College Friendly &lt;20h)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

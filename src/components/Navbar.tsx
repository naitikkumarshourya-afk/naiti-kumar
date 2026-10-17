import React from 'react';
import { 
  ShieldCheck, 
  Briefcase, 
  Building2, 
  CheckSquare, 
  Compass, 
  Bot, 
  Bookmark,
  MapPin,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'jobs' | 'companies' | 'tracker' | 'roadmap' | 'ai-advisor';
  setActiveTab: (tab: 'jobs' | 'companies' | 'tracker' | 'roadmap' | 'ai-advisor') => void;
  savedJobsCount: number;
  trackedApplicationsCount: number;
  onOpenSavedModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedJobsCount,
  trackedApplicationsCount,
  onOpenSavedModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('jobs')}
              className="flex items-center gap-3 text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm ring-1 ring-slate-800">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg text-slate-900 tracking-tight">CareerPilot</span>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">B.Tech CSE Cybersecurity Career Hub</p>
              </div>
            </button>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'jobs'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Briefcase className="w-4 h-4 text-slate-500" />
                <span>Job Explorer</span>
              </button>

              <button
                onClick={() => setActiveTab('companies')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'companies'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-4 h-4 text-slate-500" />
                <span>Companies</span>
              </button>

              <button
                onClick={() => setActiveTab('tracker')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 relative ${
                  activeTab === 'tracker'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <CheckSquare className="w-4 h-4 text-slate-500" />
                <span>Tracker</span>
                {trackedApplicationsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-slate-900 text-white">
                    {trackedApplicationsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('roadmap')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'roadmap'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Compass className="w-4 h-4 text-slate-500" />
                <span>4-Yr Cyber Roadmap</span>
              </button>

              <button
                onClick={() => setActiveTab('ai-advisor')}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  activeTab === 'ai-advisor'
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Bot className="w-4 h-4 text-indigo-600" />
                <span className="text-indigo-950 font-semibold">AI Matcher</span>
              </button>
            </nav>
          </div>

          {/* Right actions: Student Profile Badge & Saved */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSavedModal}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg relative transition-colors"
              title="Saved / Bookmarked Jobs"
            >
              <Bookmark className="w-5 h-5" />
              {savedJobsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                  {savedJobsCount}
                </span>
              )}
            </button>

            {/* Student profile pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 text-xs">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[11px]">
                NS
              </div>
              <div>
                <div className="font-semibold text-slate-900 flex items-center gap-1">
                  <span>Naitik Kumar Shourya</span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <GraduationCap className="w-3 h-3 text-slate-400" />
                  <span>B.Tech CSE (Cyber) · Yr 1</span>
                  <span>·</span>
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>Greater Noida</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`py-1 px-2 font-medium flex flex-col items-center gap-1 ${activeTab === 'jobs' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Jobs</span>
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`py-1 px-2 font-medium flex flex-col items-center gap-1 ${activeTab === 'companies' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <Building2 className="w-4 h-4" />
            <span>Companies</span>
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`py-1 px-2 font-medium flex flex-col items-center gap-1 ${activeTab === 'tracker' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Tracker ({trackedApplicationsCount})</span>
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`py-1 px-2 font-medium flex flex-col items-center gap-1 ${activeTab === 'roadmap' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <Compass className="w-4 h-4" />
            <span>Roadmap</span>
          </button>
          <button
            onClick={() => setActiveTab('ai-advisor')}
            className={`py-1 px-2 font-medium flex flex-col items-center gap-1 ${activeTab === 'ai-advisor' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <Bot className="w-4 h-4" />
            <span>AI Advisor</span>
          </button>
        </div>
      </div>
    </header>
  );
};

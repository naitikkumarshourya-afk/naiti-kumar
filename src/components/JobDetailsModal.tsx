import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Clock, 
  ShieldCheck, 
  Bookmark, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Job, TrackedApplication } from '../types';

interface JobDetailsModalProps {
  job: Job | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (job: Job) => void;
  onApplyOrTrack: (job: Job, status: 'Applied' | 'Interested') => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  onClose,
  isSaved,
  onToggleSave,
  onApplyOrTrack,
}) => {
  const [copiedCoverLetter, setCopiedCoverLetter] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState<string | null>(null);
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [hasAppliedLocally, setHasAppliedLocally] = useState(false);

  if (!job) return null;

  const handleGenerateStudentPitch = () => {
    setIsGeneratingPitch(true);
    setTimeout(() => {
      const pitch = `Subject: Application for ${job.title} - Naitik Kumar Shourya (1st Year B.Tech CSE Cybersecurity, Greater Noida)

Dear Hiring Team at ${job.company},

I am writing to express my strong interest in the ${job.title} role. As a 1st year B.Tech Computer Science student specializing in Cybersecurity based in Greater Noida, I have been actively building foundational competencies in ${job.skillsRequired.slice(0, 3).join(', ')}.

Why I am a strong candidate for this ${job.jobType}:
- Hands-on Lab Practice: Actively practicing network defense, Wireshark packet analysis, and Linux terminal utilities.
- Commitment & Schedule: Dedicated to high academic performance alongside a disciplined ${job.workload.toLowerCase()} workload commitment.
- High Velocity Learner: Eager to support ${job.company}'s engineering initiatives and bridge academic knowledge into enterprise security workflows.

Thank you for your time and consideration. I would welcome the opportunity to discuss how my passion for defensive and offensive security aligns with your team's mission.

Sincerely,
Naitik Kumar Shourya
B.Tech CSE (Cybersecurity) | Greater Noida, India
GitHub / TryHackMe / LinkedIn`;
      setGeneratedPitch(pitch);
      setIsGeneratingPitch(false);
    }, 400);
  };

  const handleCopyPitch = () => {
    if (generatedPitch) {
      navigator.clipboard.writeText(generatedPitch);
      setCopiedCoverLetter(true);
      setTimeout(() => setCopiedCoverLetter(false), 2000);
    }
  };

  const handleQuickApply = () => {
    setHasAppliedLocally(true);
    onApplyOrTrack(job, 'Applied');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/70">
          <div className="flex items-start gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-3xl shadow-sm">
              {job.companyLogo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-800">{job.company}</span>
                {job.isDemoData && (
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded">
                    DEMO DATA
                  </span>
                )}
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">{job.title}</h2>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {job.location}
                </span>
                <span>·</span>
                <span>{job.workMode}</span>
                <span>·</span>
                <span className="font-bold text-slate-900">{job.salaryDisplay}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          
          {/* Key Facts Quick Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Role Type</span>
              <span className="font-bold text-slate-900 text-xs sm:text-sm">{job.jobType}</span>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Experience</span>
              <span className="font-bold text-slate-900 text-xs sm:text-sm">{job.experienceLevel}</span>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Workload</span>
              <span className="font-bold text-emerald-700 text-xs sm:text-sm flex items-center gap-1">
                {job.workload}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Work-Life Balance</span>
              <span className="font-bold text-slate-900 text-xs sm:text-sm">{job.wlbScore}/5 ({job.wlbStatus})</span>
            </div>
          </div>

          {/* Student Workload & Schedule Advisory */}
          <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3">
            <Clock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="text-indigo-950 font-semibold block mb-0.5">
                Schedule & Student Compatibility:
              </strong>
              <p className="text-indigo-900 leading-relaxed">
                {job.workloadNote}. Shifts are adapted for B.Tech coursework and exam periods.
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">Job Description</h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">Key Responsibilities</h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements & Skills */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">Requirements & Desired Skills</h4>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {job.skillsRequired.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800 border border-slate-200"
                >
                  {skill}
                </span>
              ))}
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
              {job.qualifications.map((qual, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Perks & Benefits */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">Benefits & Perks</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              {job.benefits.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Cover Letter Generator Feature */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-linear-to-r from-indigo-50/50 to-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h4 className="font-bold text-xs sm:text-sm text-indigo-950">
                  AI Cover Pitch for 1st Year CSE Profile
                </h4>
              </div>
              <button
                onClick={handleGenerateStudentPitch}
                disabled={isGeneratingPitch}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                {isGeneratingPitch ? 'Generating...' : generatedPitch ? 'Regenerate Pitch' : 'Generate Student Pitch'}
              </button>
            </div>

            {generatedPitch && (
              <div className="mt-2 space-y-2">
                <textarea
                  readOnly
                  value={generatedPitch}
                  rows={8}
                  className="w-full text-xs font-mono p-3 rounded-lg border border-indigo-200 bg-white text-slate-800 focus:outline-none"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleCopyPitch}
                    className="px-3 py-1 text-xs font-semibold rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1.5"
                  >
                    {copiedCoverLetter ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Pitch</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={() => onToggleSave(job)}
            className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 ${
              isSaved
                ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-indigo-600' : ''}`} />
            <span>{isSaved ? 'Saved in Portal' : 'Save Job'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onApplyOrTrack(job, 'Interested')}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 transition-colors"
            >
              Add to Tracker
            </button>

            <button
              onClick={handleQuickApply}
              disabled={hasAppliedLocally}
              className={`px-4 py-2 text-xs font-semibold rounded-lg text-white shadow-sm transition-all flex items-center gap-1.5 ${
                hasAppliedLocally
                  ? 'bg-emerald-600 cursor-default'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {hasAppliedLocally ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Applied & Tracked!</span>
                </>
              ) : (
                <>
                  <span>Quick Apply & Track</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

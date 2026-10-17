import React from 'react';
import { 
  Bookmark, 
  MapPin, 
  Clock, 
  IndianRupee, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  Shield,
  PlusCircle,
  Check
} from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  isTracked: boolean;
  onToggleSave: (job: Job) => void;
  onOpenDetails: (job: Job) => void;
  onQuickTrack: (job: Job) => void;
  onApply: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  isTracked,
  onToggleSave,
  onOpenDetails,
  onQuickTrack,
  onApply,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative">
      
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            {/* Company Logo Box */}
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shrink-0">
              {job.companyLogo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-slate-600">{job.company}</span>
                {job.isDemoData ? (
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-1.5 py-0.2 rounded">
                    Demo Data
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Web Listing
                  </span>
                )}
              </div>
              <h3 
                onClick={() => onOpenDetails(job)}
                className="font-bold text-base text-slate-900 group-hover:text-indigo-600 cursor-pointer transition-colors line-clamp-1 mt-0.5"
              >
                {job.title}
              </h3>
            </div>
          </div>

          {/* Bookmark Action */}
          <button
            onClick={() => onToggleSave(job)}
            className={`p-2 rounded-lg transition-colors ${
              isSaved
                ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save Job'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-indigo-600' : ''}`} />
          </button>
        </div>

        {/* Clean unboxed metadata with typographic dot separators (Strictly Anti-Slop Compliant) */}
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1 text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {job.location}
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{job.workMode}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>{job.jobType}</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="font-semibold text-slate-800">{job.salaryDisplay}</span>
        </div>

        {/* Description Excerpt */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Skills List (Unboxed clean tags with subtle borders) */}
        <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
          {job.skillsRequired.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
            >
              {skill}
            </span>
          ))}
          {job.skillsRequired.length > 4 && (
            <span className="text-[11px] text-slate-400 font-medium self-center">
              +{job.skillsRequired.length - 4} more
            </span>
          )}
        </div>

        {/* Workload & Student Safety Highlights */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            {job.workload === 'Light' ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Light Workload · Exam Safe
              </span>
            ) : (
              <span className="text-slate-500 font-medium">
                Workload: {job.workload}
              </span>
            )}
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">
              WLB: <strong className="text-slate-800">{job.wlbScore}/5</strong> ({job.wlbStatus})
            </span>
          </div>

          {job.matchScoreForStudent && (
            <div className="flex items-center gap-1 text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              <span>{job.matchScoreForStudent}% Student Fit</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="text-[11px] text-slate-400">
          Posted {job.datePosted} · Deadline: {job.deadline}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onQuickTrack(job)}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1 ${
              isTracked
                ? 'bg-slate-100 text-slate-800 border-slate-300'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
            title={isTracked ? 'Application is being tracked' : 'Add to Application Tracker'}
          >
            {isTracked ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tracked</span>
              </>
            ) : (
              <>
                <PlusCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Track</span>
              </>
            )}
          </button>

          <button
            onClick={() => onOpenDetails(job)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
          >
            Details
          </button>

          <button
            onClick={() => onApply(job)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors flex items-center gap-1"
          >
            <span>Apply</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

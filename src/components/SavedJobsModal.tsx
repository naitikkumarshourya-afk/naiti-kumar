import React from 'react';
import { Bookmark, X, ExternalLink, Trash2, ArrowRight } from 'lucide-react';
import { Job } from '../types';

interface SavedJobsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedJobs: Job[];
  onRemoveSaved: (job: Job) => void;
  onOpenDetails: (job: Job) => void;
}

export const SavedJobsModal: React.FC<SavedJobsModalProps> = ({
  isOpen,
  onClose,
  savedJobs,
  onRemoveSaved,
  onOpenDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-indigo-600 fill-indigo-600" />
            <h3 className="font-extrabold text-slate-900 text-base">Bookmarked Jobs ({savedJobs.length})</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {savedJobs.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p>You haven't bookmarked any jobs yet.</p>
              <p className="mt-1">Click the bookmark icon on any job card to save it here.</p>
            </div>
          ) : (
            savedJobs.map(job => (
              <div 
                key={job.id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-500">{job.company}</span>
                  <h4 
                    onClick={() => {
                      onClose();
                      onOpenDetails(job);
                    }}
                    className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer"
                  >
                    {job.title}
                  </h4>
                  <div className="text-slate-500 flex items-center gap-2 text-[11px]">
                    <span>{job.location}</span>
                    <span>·</span>
                    <span className="font-semibold text-slate-700">{job.salaryDisplay}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenDetails(job);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onRemoveSaved(job)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

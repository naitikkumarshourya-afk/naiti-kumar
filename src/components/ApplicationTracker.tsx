import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  Calendar, 
  FileText, 
  Download, 
  ExternalLink, 
  Clock, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  Columns3,
  List,
  Edit2,
  X
} from 'lucide-react';
import { TrackedApplication, ApplicationStatus } from '../types';

interface ApplicationTrackerProps {
  applications: TrackedApplication[];
  onUpdateStatus: (id: string, newStatus: ApplicationStatus) => void;
  onUpdateNotes: (id: string, notes: string, interviewDate?: string) => void;
  onDeleteApplication: (id: string) => void;
  onAddCustomApplication: (app: Omit<TrackedApplication, 'id' | 'lastUpdated'>) => void;
}

const statusColumns: { id: ApplicationStatus; title: string; color: string; badgeBg: string }[] = [
  { id: 'Interested', title: 'Interested', color: 'border-slate-300', badgeBg: 'bg-slate-100 text-slate-700' },
  { id: 'Saved', title: 'Saved / Reviewing', color: 'border-blue-400', badgeBg: 'bg-blue-50 text-blue-700' },
  { id: 'Applied', title: 'Applied', color: 'border-indigo-500', badgeBg: 'bg-indigo-50 text-indigo-700' },
  { id: 'Interview', title: 'Interview / Shortlist', color: 'border-amber-500', badgeBg: 'bg-amber-50 text-amber-800' },
  { id: 'Offer', title: 'Offer Received 🎉', color: 'border-emerald-500', badgeBg: 'bg-emerald-50 text-emerald-800' },
  { id: 'Rejected', title: 'Archived', color: 'border-rose-300', badgeBg: 'bg-rose-50 text-rose-700' },
];

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  applications,
  onUpdateStatus,
  onUpdateNotes,
  onDeleteApplication,
  onAddCustomApplication,
}) => {
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<TrackedApplication | null>(null);

  // New form state
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLocation, setNewLocation] = useState('Greater Noida / Delhi NCR');
  const [newSalary, setNewSalary] = useState('₹30,000 / month');
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('Applied');
  const [newNotes, setNewNotes] = useState('');

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCompany) return;
    onAddCustomApplication({
      jobId: `custom-${Date.now()}`,
      jobTitle: newTitle,
      company: newCompany,
      location: newLocation,
      salary: newSalary,
      status: newStatus,
      appliedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      notes: newNotes,
    });
    setNewTitle('');
    setNewCompany('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = ['Company', 'Job Title', 'Location', 'Salary', 'Status', 'Date Applied', 'Interview Date', 'Notes'];
    const rows = applications.map(a => [
      `"${a.company.replace(/"/g, '""')}"`,
      `"${a.jobTitle.replace(/"/g, '""')}"`,
      `"${a.location.replace(/"/g, '""')}"`,
      `"${a.salary.replace(/"/g, '""')}"`,
      `"${a.status}"`,
      `"${a.appliedDate}"`,
      `"${a.interviewDate || ''}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CareerPilot_Applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              Recruitment Pipeline
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Job & Internship Application Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Manage your submissions, track interview rounds, and save notes. Stored locally in your browser so you never miss a follow-up.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          {/* View toggle */}
          <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Kanban Board View"
            >
              <Columns3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </button>
        </div>
      </div>

      {/* Main Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
          {statusColumns.map(col => {
            const items = applications.filter(a => a.status === col.id);
            return (
              <div 
                key={col.id} 
                className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/90 flex flex-col min-h-[380px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs text-slate-900">{col.title}</span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    {items.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {items.length === 0 ? (
                    <div className="h-28 border border-dashed border-slate-200 rounded-lg flex items-center justify-center text-[11px] text-slate-400">
                      No applications here
                    </div>
                  ) : (
                    items.map(app => (
                      <div 
                        key={app.id}
                        className="bg-white rounded-lg border border-slate-200 p-3 shadow-xs hover:shadow-sm transition-all text-xs space-y-2"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                              {app.company}
                            </span>
                            <h4 className="font-bold text-slate-900 line-clamp-1 mt-0.5">
                              {app.jobTitle}
                            </h4>
                          </div>

                          <div className="flex items-center gap-0.5">
                            <button
                              onClick={() => setEditingApp(app)}
                              className="p-1 text-slate-400 hover:text-slate-700"
                              title="Edit notes & details"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => onDeleteApplication(app.id)}
                              className="p-1 text-slate-400 hover:text-rose-600"
                              title="Delete from tracker"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-500 flex items-center justify-between">
                          <span>{app.salary}</span>
                          <span>{app.appliedDate}</span>
                        </div>

                        {app.notes && (
                          <div className="p-2 rounded bg-slate-50 border border-slate-100 text-[11px] text-slate-600 line-clamp-2 italic">
                            "{app.notes}"
                          </div>
                        )}

                        {app.interviewDate && (
                          <div className="flex items-center gap-1 text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                            <Calendar className="w-3 h-3" />
                            <span>Interview: {app.interviewDate}</span>
                          </div>
                        )}

                        {/* Fast Status Change Selector */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                          <label className="text-[10px] text-slate-400 font-medium">Move:</label>
                          <select
                            value={app.status}
                            onChange={(e) => onUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                            className="text-[11px] font-semibold bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          >
                            <option value="Interested">Interested</option>
                            <option value="Saved">Saved</option>
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Archived</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Role & Company</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Package</th>
                <th className="py-3 px-4">Applied Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Notes & Interview</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map(app => (
                <tr key={app.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4">
                    <span className="font-extrabold text-slate-900 block">{app.jobTitle}</span>
                    <span className="text-[11px] text-slate-500 font-medium">{app.company}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{app.location}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{app.salary}</td>
                  <td className="py-3 px-4 text-slate-500">{app.appliedDate}</td>
                  <td className="py-3 px-4">
                    <select
                      value={app.status}
                      onChange={(e) => onUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                      className="text-xs font-semibold bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-700"
                    >
                      <option value="Interested">Interested</option>
                      <option value="Saved">Saved</option>
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Archived</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-slate-600">
                    {app.interviewDate ? (
                      <span className="font-semibold text-amber-700 mr-2">📅 {app.interviewDate}</span>
                    ) : null}
                    {app.notes || <span className="text-slate-300">No notes</span>}
                  </td>
                  <td className="py-3 px-4 text-right space-x-1">
                    <button
                      onClick={() => setEditingApp(app)}
                      className="p-1.5 text-slate-500 hover:text-slate-900 rounded"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteApplication(app.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Custom Application Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-base">Add Application to Pipeline</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustom} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cisco Systems or TAC Security"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cybersecurity Intern / SOC Analyst"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Stipend / Salary</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500 font-semibold"
                >
                  <option value="Interested">Interested</option>
                  <option value="Saved">Saved</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Personal Notes / Prep Details</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Applied via college alumni referral. Practiced Wireshark & PortSwigger SQLi labs."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Notes Modal */}
      {editingApp && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-base">Edit Application Details</h3>
              <button onClick={() => setEditingApp(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="font-bold text-slate-900">{editingApp.jobTitle}</div>
                <div className="text-slate-500">{editingApp.company}</div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Interview Date (if scheduled)</label>
                <input
                  type="text"
                  placeholder="e.g. Nov 12 at 4:00 PM (Google Meet)"
                  value={editingApp.interviewDate || ''}
                  onChange={(e) => setEditingApp({ ...editingApp, interviewDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Prep Notes & Follow-up Log</label>
                <textarea
                  rows={4}
                  placeholder="Add technical questions asked, portfolio links sent, or recruiter contact details"
                  value={editingApp.notes}
                  onChange={(e) => setEditingApp({ ...editingApp, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingApp(null)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onUpdateNotes(editingApp.id, editingApp.notes, editingApp.interviewDate);
                    setEditingApp(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Update Log
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

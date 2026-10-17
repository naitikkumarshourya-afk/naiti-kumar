import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  Terminal, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  GraduationCap
} from 'lucide-react';
import { cybersecurityRoadmap, certificationGuides } from '../data/roadmapData';

export const CyberRoadmap: React.FC = () => {
  // Store completed milestone task IDs in localStorage
  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('careerpilot_roadmap_tasks');
      return stored ? JSON.parse(stored) : ['year-1-task-0', 'year-1-task-1'];
    } catch {
      return ['year-1-task-0', 'year-1-task-1'];
    }
  });

  const [activeTab, setActiveTab] = useState<'roadmap' | 'certifications'>('roadmap');

  useEffect(() => {
    try {
      localStorage.setItem('careerpilot_roadmap_tasks', JSON.stringify(completedTasks));
    } catch (e) {
      console.error(e);
    }
  }, [completedTasks]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              Academic & Placement Blueprint
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-600 font-medium">B.Tech CSE Cybersecurity (2024-2028 / 2025-2029)</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            4-Year Cybersecurity Career Roadmap
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            A battle-tested semester-by-semester guide curated specifically for first-year engineering students in Greater Noida to advance from zero to elite ₹15–35 LPA placements.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-center">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'roadmap' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            4-Year Milestones
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'certifications' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Certifications & Discounts
          </button>
        </div>
      </div>

      {activeTab === 'roadmap' ? (
        <div className="space-y-6">
          {cybersecurityRoadmap.map((stage) => {
            const isCurrentYear = stage.year === 1;

            return (
              <div
                key={stage.id}
                className={`bg-white rounded-2xl border p-6 shadow-sm transition-all relative overflow-hidden ${
                  isCurrentYear 
                    ? 'border-indigo-400 ring-2 ring-indigo-500/20' 
                    : 'border-slate-200'
                }`}
              >
                {/* Year Badge Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                      isCurrentYear ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      Y{stage.year}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-base text-slate-900">{stage.title}</h3>
                        {isCurrentYear && (
                          <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                            YOUR CURRENT YEAR
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-medium text-slate-500">{stage.semester} · {stage.focusArea}</span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {stage.description}
                </p>

                {/* Subsections: Skills, Projects, Free Labs */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Skills Checklist */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2.5">
                    <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                      <Terminal className="w-3.5 h-3.5 text-indigo-600" />
                      Core Competencies
                    </span>
                    <ul className="space-y-2 text-xs">
                      {stage.skillsToMaster.map((skill, sIdx) => {
                        const taskId = `${stage.id}-task-${sIdx}`;
                        const isDone = completedTasks.includes(taskId);
                        return (
                          <li 
                            key={sIdx}
                            onClick={() => toggleTask(taskId)}
                            className="flex items-start gap-2 cursor-pointer group text-slate-700 hover:text-slate-900"
                          >
                            <button className="mt-0.5 shrink-0">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-300 group-hover:text-slate-400" />
                              )}
                            </button>
                            <span className={isDone ? 'line-through text-slate-400' : ''}>
                              {skill}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Portfolio Projects */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2.5">
                    <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                      Resume Proof Projects
                    </span>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {stage.recommendedProjects.map((proj, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                          <span>{proj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Free Student Resources */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2.5">
                    <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Free Practice Platforms
                    </span>
                    <ul className="space-y-2 text-xs">
                      {stage.freePlatforms.map((plat, fIdx) => (
                        <li key={fIdx}>
                          <a
                            href={plat.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 group"
                          >
                            <span>{plat.name}</span>
                            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </a>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{plat.note}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Certifications Guide */
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 text-xs text-amber-900">
            <Award className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">
                Pro-Tip for Greater Noida / Indian University Students:
              </strong>
              Always register with your college <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.edu / .ac.in</code> institutional email ID on CompTIA Academic Marketplace, AWS Educate, and GitHub Student Developer Pack to save up to 45% on official exam vouchers.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {certificationGuides.map((cert, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {cert.provider}
                    </span>
                    <h3 className="font-extrabold text-slate-900 text-base">{cert.name}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    cert.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700' :
                    cert.difficulty === 'Intermediate' ? 'bg-indigo-50 text-indigo-700' : 'bg-purple-50 text-purple-700'
                  }`}>
                    {cert.difficulty}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div>
                    <span className="font-semibold text-slate-700">Student Discount / Cost: </span>
                    <span className="text-slate-600">{cert.costInr}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Discount Method: </span>
                    <span className="text-emerald-700 font-medium">{cert.studentDiscount}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Target Roles: </span>
                    <span className="text-slate-600">{cert.targetRole}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 pt-2 border-t border-slate-100 leading-relaxed">
                  <strong className="text-slate-800">Why it matters:</strong> {cert.whyItMatters}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

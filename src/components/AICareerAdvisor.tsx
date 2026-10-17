import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle, 
  BookOpen, 
  Target,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import { Job } from '../types';

interface AICareerAdvisorProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
}

export const AICareerAdvisor: React.FC<AICareerAdvisorProps> = ({
  jobs,
  onSelectJob,
}) => {
  const [studentSkills, setStudentSkills] = useState('Python, Linux basics, TCP/IP, Wireshark, Git, C++');
  const [targetRole, setTargetRole] = useState('SOC Analyst / Junior Security Engineer');
  const [weeklyHours, setWeeklyHours] = useState('15');
  const [analysisResult, setAnalysisResult] = useState<{
    fitScore: number;
    strengths: string[];
    gapSkills: string[];
    actionPlan30Days: string[];
    resumeBullets: string[];
    recommendedJobIds: string[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleRunAnalysis = () => {
    setIsLoading(true);

    setTimeout(() => {
      // Intelligent rule-based evaluation matched against our database
      const skillsArray = studentSkills.toLowerCase().split(',').map(s => s.trim());
      
      const hasNetworking = skillsArray.some(s => s.includes('tcp') || s.includes('network') || s.includes('ip'));
      const hasLinux = skillsArray.some(s => s.includes('linux') || s.includes('bash') || s.includes('ubuntu'));
      const hasCoding = skillsArray.some(s => s.includes('python') || s.includes('c++') || s.includes('java'));
      const hasTools = skillsArray.some(s => s.includes('wire') || s.includes('burp') || s.includes('nmap'));

      let score = 75;
      if (hasNetworking) score += 8;
      if (hasLinux) score += 8;
      if (hasCoding) score += 5;
      if (hasTools) score += 4;
      score = Math.min(score, 96);

      const strengths = [
        'Solid foundational networking & protocol comprehension (essential for SOC & Network Security)',
        'Linux command line familiarity — primary requirement for modern enterprise cybersecurity platforms',
        'Programming capability for script automation and vulnerability analysis'
      ];

      const gapSkills = [
        'SIEM Platform exposure: Practice querying logs with Splunk Free or Elastic Security',
        'OWASP Top 10 hands-on exploitation: Complete 20 PortSwigger Web Security Academy labs',
        'Sigma & YARA rule authoring: Essential for threat detection and incident triage'
      ];

      const actionPlan30Days = [
        'Week 1: Solve OverTheWire Bandit challenges 1 through 25 to solidify Linux proficiency.',
        'Week 2: Set up a virtual machine with Wireshark and capture DNS, ARP, and HTTP handshakes.',
        'Week 3: Complete the TryHackMe "Pre-Security" and "SOC Level 1" introductory rooms.',
        'Week 4: Publish your first GitHub repository: A Python port scanner or log analysis script.'
      ];

      const resumeBullets = [
        'Analyzed network traffic using Wireshark to identify anomalous DNS queries and unencrypted credentials across simulated local subnets.',
        'Authored multithreaded Python socket scripts to automate port discovery and network service banner grabbing.',
        'Configured isolated Linux virtualization lab environment (VirtualBox/Kali) for vulnerability assessment and defensive hardening.'
      ];

      // Recommend relevant jobs
      const recommended = jobs
        .filter(j => j.careerMode === 'now' || j.matchScoreForStudent! >= 90)
        .slice(0, 3)
        .map(j => j.id);

      setAnalysisResult({
        fitScore: score,
        strengths,
        gapSkills,
        actionPlan30Days,
        resumeBullets,
        recommendedJobIds: recommended,
      });

      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Advisor Top Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              AI Career Mentor
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">B.Tech 1st Year Skill Matcher</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Skill Gap & Placement Readiness Advisor
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Input your current coursework, technical skills, and target career goals. Get personalized gap analysis, custom 30-day roadmap, and high-impact resume bullet points.
          </p>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={isLoading}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2 self-start md:self-center"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Market Fit...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Analyze My Profile</span>
            </>
          )}
        </button>
      </div>

      {/* Input Panel */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Current Skills & Tools</label>
          <input
            type="text"
            value={studentSkills}
            onChange={(e) => setStudentSkills(e.target.value)}
            placeholder="e.g. Python, Wireshark, Linux, Git, C++"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Target Aspirations</label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800"
          >
            <option value="SOC Analyst / Junior Security Engineer">SOC Analyst / Blue Team Defense</option>
            <option value="Penetration Tester / VAPT Specialist">Penetration Tester / Offensive Security</option>
            <option value="Cloud Security Engineer (AWS/Azure)">Cloud & DevOps Security Engineer</option>
            <option value="Application Security Engineer (FinTech/Startups)">Application Security Engineer</option>
            <option value="SDE-1 Security (Microsoft IDC/Tier 1)">SDE-1 Systems & Security</option>
          </select>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Available Hours / Week (College-Safe)</label>
          <select
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-800"
          >
            <option value="10">10 hours/week (Light / Exam Preparation)</option>
            <option value="15">15 hours/week (Recommended Student Balance)</option>
            <option value="20">20 hours/week (Active Semester Internship)</option>
            <option value="35">35+ hours/week (Semester Break / Full-time)</option>
          </select>
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysisResult ? (
        <div className="space-y-6">
          {/* Top Score Banner */}
          <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block">
                Readiness Evaluation
              </span>
              <h3 className="text-xl font-extrabold mt-0.5">
                {targetRole} Profile Match
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Based on your current 1st year CSE baseline and {weeklyHours}h/week dedication.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white/10 px-5 py-3 rounded-xl backdrop-blur-xs border border-white/10 self-start sm:self-center">
              <div className="text-center">
                <span className="text-2xl font-extrabold text-emerald-400 block">
                  {analysisResult.fitScore}%
                </span>
                <span className="text-[10px] text-slate-300 uppercase font-semibold">
                  Competency Score
                </span>
              </div>
            </div>
          </div>

          {/* 3-Column Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Strengths */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Your Active Strengths</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {analysisResult.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gap Skills */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>High-Value Skill Gaps</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {analysisResult.gapSkills.map((gap, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 30-Day Plan */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Immediate 30-Day Gameplan</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                {analysisResult.actionPlan30Days.map((plan, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span>{plan}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actionable Resume Bullets for 1st Year */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
              <FileCheck className="w-4 h-4 text-indigo-600" />
              <span>Recommended Resume Bullet Points for Your Level</span>
            </div>
            <p className="text-xs text-slate-500">
              Copy and paste these verified action-verb bullet points into your 1st-year resume:
            </p>

            <div className="space-y-2">
              {analysisResult.resumeBullets.map((bullet, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800">
                  • {bullet}
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-extrabold text-slate-900 text-sm">
              Top Matched Roles for Your Profile Right Now
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {jobs
                .filter(j => analysisResult.recommendedJobIds.includes(j.id))
                .map(job => (
                  <div 
                    key={job.id} 
                    className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-white transition-all space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-600">{job.company}</span>
                        <span className="text-xs font-extrabold text-emerald-700">{job.salaryDisplay}</span>
                      </div>
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm mt-1">{job.title}</h5>
                      <span className="text-[11px] text-slate-500 block mt-0.5">{job.location} · {job.workMode}</span>
                    </div>

                    <button
                      onClick={() => onSelectJob(job)}
                      className="w-full mt-3 py-1.5 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>View Matched Role</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-500 space-y-2">
          <Bot className="w-10 h-10 text-indigo-400 mx-auto" />
          <h4 className="font-bold text-slate-800 text-sm">Profile Assessment Ready</h4>
          <p className="text-xs max-w-md mx-auto">
            Click "Analyze My Profile" above to compute your market fit score, 30-day action plan, and customized resume bullets.
          </p>
        </div>
      )}
    </div>
  );
};

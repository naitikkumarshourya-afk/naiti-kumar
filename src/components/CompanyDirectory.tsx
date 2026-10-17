import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Star, 
  MapPin, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Scale, 
  Check, 
  X, 
  ExternalLink,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Company, Job } from '../types';

interface CompanyDirectoryProps {
  companies: Company[];
  jobs: Job[];
  onSelectCompanyFilter: (companyName: string) => void;
}

export const CompanyDirectory: React.FC<CompanyDirectoryProps> = ({
  companies,
  jobs,
  onSelectCompanyFilter,
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const industries = ['All', 'Cybersecurity Specialized', 'Product / Big Tech', 'Startup / Unicorn', 'IT Services & Consulting'];

  const filteredCompanies = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.techStack.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
      c.headquarters.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All' || c.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  const toggleCompare = (companyId: string) => {
    if (comparisonList.includes(companyId)) {
      setComparisonList(prev => prev.filter(id => id !== companyId));
    } else {
      if (comparisonList.length >= 3) {
        alert('You can compare up to 3 companies simultaneously.');
        return;
      }
      setComparisonList(prev => [...prev, companyId]);
    }
  };

  const comparedCompanies = companies.filter(c => comparisonList.includes(c.id));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              Employer Intelligence
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Company Discovery & Comparisons
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Explore top cybersecurity defense firms, high-paying tech giants, and regional hubs near Greater Noida. Compare work culture, fresher compensation, and student internship policies side by side.
          </p>
        </div>

        {/* Comparison Floating Action Button */}
        {comparisonList.length > 0 && (
          <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-4 py-2.5 rounded-xl">
            <Scale className="w-5 h-5 text-indigo-600" />
            <span className="text-xs font-bold text-indigo-900">
              {comparisonList.length} Selected for Compare
            </span>
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="ml-2 px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
            >
              Compare Now
            </button>
            <button
              onClick={() => setComparisonList([])}
              className="p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company or tech stack..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Industry Chips */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {industries.map(ind => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedIndustry === ind
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCompanies.map(comp => {
          const isComparing = comparisonList.includes(comp.id);
          const activeCompanyJobs = jobs.filter(j => j.companyId === comp.id || j.company.toLowerCase().includes(comp.name.toLowerCase()));

          return (
            <div 
              key={comp.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shrink-0">
                      {comp.logo}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{comp.name}</h3>
                      <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded">
                        {comp.industry}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleCompare(comp.id)}
                    className={`px-2 py-1 text-[11px] font-semibold rounded-lg border transition-colors flex items-center gap-1 ${
                      isComparing
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Scale className="w-3 h-3" />
                    <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                  </button>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {comp.description}
                </p>

                {/* Metrics */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                      Fresher Package
                    </span>
                    <span className="font-extrabold text-slate-900 text-xs mt-0.5 block">
                      {comp.avgFresherSalary}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                      WLB Rating
                    </span>
                    <span className="font-extrabold text-slate-900 text-xs mt-0.5 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      {comp.wlbScore} / 5.0
                    </span>
                  </div>
                </div>

                {/* India Offices */}
                <div className="mt-3 text-xs text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{comp.officesInIndia.join(', ')}</span>
                </div>

                {/* Tech Stack */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {comp.techStack.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {tech}
                    </span>
                  ))}
                  {comp.techStack.length > 4 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{comp.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-indigo-700">
                  {activeCompanyJobs.length} Active Positions
                </span>

                <button
                  onClick={() => onSelectCompanyFilter(comp.name)}
                  className="font-bold text-slate-900 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                >
                  <span>Explore Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-600" />
                <h3 className="font-extrabold text-slate-900 text-lg">Side-by-Side Employer Comparison</h3>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 px-4 font-bold text-slate-500 uppercase tracking-wider w-1/4">Metric</th>
                    {comparedCompanies.map(c => (
                      <th key={c.id} className="py-3 px-4 font-extrabold text-slate-900 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{c.logo}</span>
                          <span>{c.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Industry</td>
                    {comparedCompanies.map(c => (
                      <td key={c.id} className="py-3 px-4 text-slate-800 font-medium">{c.industry}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Fresher / Graduate Package</td>
                    {comparedCompanies.map(c => (
                      <td key={c.id} className="py-3 px-4 font-extrabold text-emerald-700">{c.avgFresherSalary}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Work-Life Balance Score</td>
                    {comparedCompanies.map(c => (
                      <td key={c.id} className="py-3 px-4 font-bold text-slate-900">
                        ⭐ {c.wlbScore} / 5.0 ({c.wlbRatingCount} reviews)
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Student & Intern Friendliness</td>
                    {comparedCompanies.map(c => (
                      <td key={c.id} className="py-3 px-4 text-slate-800">
                        {c.cultureRating.studentFriendly} / 5.0 (High mentorship)
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">NCR / Greater Noida Offices</td>
                    {comparedCompanies.map(c => (
                      <td key={c.id} className="py-3 px-4 text-slate-800">
                        {c.officesInIndia.filter(o => o.includes('Noida') || o.includes('Delhi') || o.includes('Gurgaon') || o.includes('Remote')).join(', ') || 'Bangalore / Pune only'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Core Cybersecurity Tech Stack</td>
                    {comparedCompanies.map(c => (
                      <td key={c.id} className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {c.techStack.map((t, idx) => (
                            <span key={idx} className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-slate-600">Key Benefits</td>
                    {comparedCompanies.map(c => (
                      <td key={c.id} className="py-3 px-4 text-slate-600">
                        <ul className="space-y-1">
                          {c.benefits.slice(0, 3).map((b, idx) => (
                            <li key={idx}>• {b}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Project, Member } from '../types';
import { ChevronDown, Briefcase, User } from 'lucide-react';

interface SelectionHeaderProps {
  projects: Project[];
  members: Member[];
  selectedProject: string;
  selectedMember: string;
  onSelectProject: (id: string) => void;
  onSelectMember: (id: string) => void;
}

export const SelectionHeader: React.FC<SelectionHeaderProps> = ({
  projects,
  members,
  selectedProject,
  selectedMember,
  onSelectProject,
  onSelectMember,
}) => {
  
  const filteredMembers = members.filter(m => m.projectId === selectedProject);

  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/60 shadow-xl shadow-brand-900/5 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Project Select */}
      <div className="relative group">
        <label className="block text-xs font-bold text-brand-800 uppercase tracking-wide mb-1.5 ml-1 opacity-80">
          Chọn Dự Án
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-500">
            <Briefcase size={18} />
          </div>
          <select
            value={selectedProject}
            onChange={(e) => onSelectProject(e.target.value)}
            className="block w-full pl-10 pr-10 py-3 text-base border border-brand-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-500 bg-white/70 appearance-none cursor-pointer text-brand-900 font-semibold transition-all hover:bg-white hover:border-brand-300"
          >
            <option value="" disabled>Chọn dự án...</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-brand-400">
            <ChevronDown size={18} />
          </div>
        </div>
      </div>

      {/* Member Select */}
      <div className={`relative group transition-all duration-300 ${!selectedProject ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
        <label className="block text-xs font-bold text-brand-800 uppercase tracking-wide mb-1.5 ml-1 opacity-80">
          Người được review
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-500">
            <User size={18} />
          </div>
          <select
            value={selectedMember}
            onChange={(e) => onSelectMember(e.target.value)}
            disabled={!selectedProject}
            className="block w-full pl-10 pr-10 py-3 text-base border border-brand-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-500 bg-white/70 appearance-none cursor-pointer text-brand-900 font-semibold transition-all disabled:bg-slate-100/50 hover:bg-white hover:border-brand-300"
          >
            <option value="" disabled>Chọn thành viên...</option>
            {filteredMembers.map((m) => (
              <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-brand-400">
            <ChevronDown size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
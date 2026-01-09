import React from 'react';
import { SentimentLevel } from '../types';
import { ThumbsUp, AlertCircle, CheckCircle } from 'lucide-react';

interface WillingnessSelectProps {
  value: SentimentLevel | null;
  onChange: (value: SentimentLevel) => void;
}

export const WillingnessSelect: React.FC<WillingnessSelectProps> = ({ value, onChange }) => {
  const options = [
    { 
      val: SentimentLevel.EXCELLENT, 
      label: 'Đồng đội đích thực, hợp tác tuyệt vời', 
      colorClass: 'border-emerald-200/60 bg-emerald-50/50 text-emerald-800 hover:bg-emerald-50 hover:border-emerald-300 ring-emerald-500',
      activeClass: 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 shadow-md shadow-emerald-500/10',
      icon: <ThumbsUp size={24} className="mb-3 text-emerald-600" />
    },
    { 
      val: SentimentLevel.ACCEPTABLE, 
      label: 'Vừa đủ để đồng hành tiếp', 
      colorClass: 'border-slate-200/60 bg-slate-50/50 text-slate-700 hover:bg-slate-50 hover:border-slate-300 ring-slate-400',
      activeClass: 'bg-slate-50 border-slate-500 ring-1 ring-slate-500 shadow-md shadow-slate-500/10',
      icon: <CheckCircle size={24} className="mb-3 text-slate-500" />
    },
    { 
      val: SentimentLevel.IMPROVEMENT_NEEDED, 
      label: 'Vẫn còn những điểm cần phải cải thiện sớm', 
      colorClass: 'border-amber-200/60 bg-amber-50/50 text-amber-800 hover:bg-amber-50 hover:border-amber-300 ring-amber-500',
      activeClass: 'bg-amber-50 border-amber-500 ring-1 ring-amber-500 shadow-md shadow-amber-500/10',
      icon: <AlertCircle size={24} className="mb-3 text-amber-600" />
    },
  ];

  return (
    <div className="mb-10">
      <label className="block text-sm font-bold text-brand-900 mb-4 ml-1">
        Cảm nhận chung của bạn về đồng đội này? <span className="text-red-500">*</span>
      </label>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => {
          const isSelected = value === option.val;
          return (
            <button
              key={option.val}
              type="button"
              onClick={() => onChange(option.val)}
              className={`
                relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 text-center transition-all duration-200 h-full backdrop-blur-sm
                ${isSelected ? option.activeClass : option.colorClass}
                ${!isSelected && 'opacity-70 hover:opacity-100 hover:scale-[1.02]'}
              `}
            >
              {option.icon}
              <span className="text-sm font-bold leading-snug">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
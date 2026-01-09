import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helperText?: string;
  optional?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({ 
  label, 
  helperText, 
  optional, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between mb-2">
        <label className="block text-sm font-bold text-brand-900 ml-1">
          {label} 
          {optional && <span className="text-brand-500 font-normal ml-1 font-medium text-xs bg-brand-50 px-2 py-0.5 rounded-full">Optional</span>}
        </label>
      </div>
      
      <textarea
        className={`
          w-full p-4 rounded-2xl border border-brand-200/80 bg-white/60
          text-brand-900 placeholder-brand-400/70
          text-base leading-relaxed
          focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-500 focus:bg-white
          transition-all duration-200 ease-in-out
          resize-none min-h-[120px] shadow-sm hover:border-brand-300 hover:bg-white/80
          ${className}
        `}
        {...props}
      />
      {helperText && (
        <p className="mt-2 text-xs text-brand-600 font-medium ml-1">{helperText}</p>
      )}
    </div>
  );
};
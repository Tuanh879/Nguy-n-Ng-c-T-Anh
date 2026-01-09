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
        <label className="block text-sm font-semibold text-brand-900">
          {label} 
          {optional && <span className="text-brand-400 font-normal ml-1 font-light italic"> — Optional</span>}
        </label>
      </div>
      
      <textarea
        className={`
          w-full p-4 rounded-xl border border-brand-100 bg-white 
          text-brand-900 placeholder-brand-300
          text-base leading-relaxed
          focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-500
          transition-all duration-200 ease-in-out
          resize-none min-h-[120px] shadow-sm hover:border-brand-300
          ${className}
        `}
        {...props}
      />
      {helperText && (
        <p className="mt-2 text-xs text-brand-500">{helperText}</p>
      )}
    </div>
  );
};
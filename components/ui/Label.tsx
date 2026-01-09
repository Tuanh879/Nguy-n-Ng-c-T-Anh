import React from 'react';

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
  optional?: boolean;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children, className = '', optional = false }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-slate-700 mb-2 ${className}`}>
      {children}
      {optional && <span className="text-slate-400 font-normal ml-1">(optional)</span>}
    </label>
  );
};
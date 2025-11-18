import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className = '', ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`block w-full rounded-md border border-gray-300 px-3 py-2 text-base shadow-sm focus:border-[#D13F43] focus:ring-[#D13F43] ${className}`}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };

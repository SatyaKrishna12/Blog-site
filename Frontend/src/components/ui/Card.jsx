import * as React from "react";

// Card wrapper
export const Card = ({ className = "", children, ...props }) => (
  <div
    className={`rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-200 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Header section with vertical spacing
export const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`px-6 pt-6 pb-4 space-y-2 ${className}`} {...props}>
    {children}
  </div>
);

// Title with bold and responsive typography
export const CardTitle = ({ className = "", children, ...props }) => (
  <h3
    className={`text-2xl font-bold leading-snug tracking-tight text-gray-800 ${className}`}
    {...props}
  >
    {children}
  </h3>
);

// Description with soft gray text
export const CardDescription = ({ className = "", children, ...props }) => (
  <p className={`text-sm text-gray-500 leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

// Main content block
export const CardContent = ({ className = "", children, ...props }) => (
  <div className={`px-6 pb-4 ${className}`} {...props}>
    {children}
  </div>
);

// Footer section (e.g., buttons, links)
export const CardFooter = ({ className = "", children, ...props }) => (
  <div className={`px-6 pb-6 pt-2 flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);

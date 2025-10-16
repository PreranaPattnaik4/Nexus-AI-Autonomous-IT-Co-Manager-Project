import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2l7 7-7 7-7-7 7-7z" />
      <path d="M2 12l7 7 7-7-7-7" />
    </svg>
  );
}

export function UnderstandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 2a10 10 0 100 20 10 10 0 100-20z"/>
        <path d="M12 18a6 6 0 110-12"/>
        <path d="M12 12v.01"/>
        <path d="M12 8v.01"/>
        <path d="M12 16v.01"/>
    </svg>
  );
}

export function PlanIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M12 5v14"/>
            <path d="M18 11l-6-6-6 6"/>
        </svg>
    )
}

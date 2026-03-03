import type { SVGProps } from 'react';

export const SadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="none" {...props}>
    <circle
      cx={15}
      cy={15}
      r={12.25}
      stroke="currentcolor"
      strokeWidth={1.5}
      style={{
        stroke: '#353232',
        strokeOpacity: 1,
      }}
    />
    <path
      fill="currentcolor"
      d="M12.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM20.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      style={{
        fill: '#353232',
        fillOpacity: 1,
      }}
    />
    <path
      stroke="currentcolor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M10 19c2-4 8-4 10 0"
      style={{
        stroke: '#353232',
        strokeOpacity: 1,
      }}
    />
  </svg>
);

import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export function SadIcon({ size = 30, color = '#353232' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <Circle cx={15} cy={15} r={12.25} stroke={color} strokeWidth={1.5} />
      <Path
        fill={color}
        d="M12.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM20.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      />
      <Path stroke={color} strokeLinecap="round" strokeWidth={1.5} d="M10 19c2-4 8-4 10 0" />
    </Svg>
  );
}

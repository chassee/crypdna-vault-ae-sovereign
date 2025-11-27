import React from 'react';

interface PawLogoProps {
  className?: string;
  size?: number;
}

const PawLogo: React.FC<PawLogoProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main Pad */}
      <ellipse
        cx="24"
        cy="32"
        rx="10"
        ry="8"
        className="animate-pulse"
      />
      
      {/* Top Left Toe */}
      <ellipse
        cx="14"
        cy="18"
        rx="4.5"
        ry="6"
        transform="rotate(-15 14 18)"
      />
      
      {/* Top Middle-Left Toe */}
      <ellipse
        cx="20"
        cy="14"
        rx="4.5"
        ry="6.5"
        transform="rotate(-5 20 14)"
      />
      
      {/* Top Middle-Right Toe */}
      <ellipse
        cx="28"
        cy="14"
        rx="4.5"
        ry="6.5"
        transform="rotate(5 28 14)"
      />
      
      {/* Top Right Toe */}
      <ellipse
        cx="34"
        cy="18"
        rx="4.5"
        ry="6"
        transform="rotate(15 34 18)"
      />
    </svg>
  );
};

export default PawLogo;

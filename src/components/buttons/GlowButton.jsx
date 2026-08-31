import React from 'react';
import { Button } from './Button';

export const GlowButton = ({
  children,
  to,
  href,
  onClick,
  className = '',
  size = 'md',
  icon: Icon,
  ...props
}) => {
  return (
    <Button
      to={to}
      href={href}
      onClick={onClick}
      variant="primary"
      size={size}
      icon={Icon}
      className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GlowButton;

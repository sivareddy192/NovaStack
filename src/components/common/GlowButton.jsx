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
      className={`bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GlowButton;

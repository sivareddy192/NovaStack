import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

export const ErrorState = ({
  title = 'Failed to load content',
  message = 'An unexpected error occurred while communicating with our servers.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`rounded-2xl bg-white border border-slate-200 p-8 text-center max-w-md mx-auto ${className}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mx-auto mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 mb-6 leading-relaxed">{message}</p>

      {onRetry && (
        <Button
          onClick={onRetry}
          variant="secondary"
          size="sm"
          icon={RefreshCw}
          className="mx-auto"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;

import { Loader2 } from 'lucide-react';
import { cn } from '@packages/ui/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = 'md',
  className,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const Wrapper = fullScreen ? FullScreenWrapper : DefaultWrapper;

  return (
    <Wrapper>
      <Loader2
        className={cn(
          'animate-spin',
          sizeClasses[size],
          'text-primary dark:text-primary-dark',
          className
        )}
      />
    </Wrapper>
  );
}

function FullScreenWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm dark:bg-background-dark/50">
      {children}
    </div>
  );
}

function DefaultWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center p-4">
      {children}
    </div>
  );
} 
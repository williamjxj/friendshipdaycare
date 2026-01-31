'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
          <span className="text-white font-bold text-2xl">!</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Something went wrong!</h2>
          <p className="text-muted-foreground text-balance">
            We&apos;re sorry, but something unexpected happened. Please try again.
          </p>
        </div>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
          <div>
            <Link
              href="/"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Go back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

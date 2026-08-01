import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAF7F2]">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-rose-200 shadow-2xl space-y-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-2xl font-black">
              ⚠️
            </div>
            <h2 className="text-2xl font-black text-slate-900">Something went wrong</h2>
            <p className="text-xs text-rose-600 font-mono bg-rose-50 p-3 rounded-xl break-all">
              {this.state.error?.message || 'Unknown runtime error'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#FF2E4D] text-white rounded-full font-black text-sm hover:opacity-90 transition-opacity"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

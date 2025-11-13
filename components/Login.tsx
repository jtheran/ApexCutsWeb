import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const SpinnerIcon = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.421,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

const MicrosoftIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 21 21">
        <path fill="#f25022" d="M1 1h9v9H1z"></path><path fill="#00a4ef" d="M1 11h9v9H1z"></path><path fill="#7fba00" d="M11 1h9v9h-9z"></path><path fill="#ffb900" d="M11 11h9v9h-9z"></path>
    </svg>
);

const AppleIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 3.012C8.342 3.012 7.03 4.312 7.03 5.946c0 1.622 1.312 2.922 2.97 2.922s2.97-1.3 2.97-2.922c0-1.634-1.312-2.934-2.97-2.934Zm-0.016 12.184c-2.31 0-4.06-1.35-5.36-1.35-1.49 0-2.45 1.4-3.32 1.4-0.9 0-1.78-.9-2.28-1.38-.52-.48-1.12-1.36-1.12-2.61 0-2.02 1.83-3.21 3.63-3.21 1.25 0 2.19.89 3.29.89 1.07 0 2.22-.98 3.71-.98 1.78 0 3.32 1.15 3.32 3.12 0 2.53-2.13 3.9-3.9 3.9h-.03Z" transform="translate(4.68 1.4)"></path>
    </svg>
);

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleAuth = (provider: string) => {
    setLoadingProvider(provider);
    setTimeout(() => {
      onLogin();
      // No need to reset loadingProvider as the component will unmount
    }, 1500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAuth('email');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-surface rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 space-y-6">
        <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-on-surface">Apex Cuts</h1>
            <p className="text-on-surface-variant mt-2 text-sm sm:text-base">Welcome back, please log in to your account</p>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleAuth('google')}
              disabled={!!loadingProvider}
              className="flex items-center justify-center py-2.5 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingProvider === 'google' ? <SpinnerIcon /> : <GoogleIcon />}
            </button>
            <button 
              onClick={() => handleAuth('microsoft')}
              disabled={!!loadingProvider}
              className="flex items-center justify-center py-2.5 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingProvider === 'microsoft' ? <SpinnerIcon /> : <MicrosoftIcon />}
            </button>
            <button 
              onClick={() => handleAuth('apple')}
              disabled={!!loadingProvider}
              className="flex items-center justify-center py-2.5 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingProvider === 'apple' ? <SpinnerIcon /> : <AppleIcon />}
            </button>
        </div>

        <div className="flex items-center justify-center space-x-2">
            <span className="h-px w-full bg-gray-600"></span>
            <span className="text-on-surface-variant text-sm">OR</span>
            <span className="h-px w-full bg-gray-600"></span>
        </div>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-on-surface-variant mb-2">Email</label>
                <input type="email" id="email" defaultValue="admin@apexcuts.com" disabled={!!loadingProvider} className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-on-surface focus:ring-primary focus:border-primary transition text-sm sm:text-base disabled:opacity-50" />
            </div>
            <div>
                <label htmlFor="password"className="block text-sm font-medium text-on-surface-variant mb-2">Password</label>
                <input type="password" id="password" defaultValue="password" disabled={!!loadingProvider} className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-on-surface focus:ring-primary focus:border-primary transition text-sm sm:text-base disabled:opacity-50" />
            </div>
            <div className="flex items-center justify-between">
                <a href="#" className={`text-sm text-primary hover:underline ${!!loadingProvider ? 'opacity-50 pointer-events-none' : ''}`}>Forgot password?</a>
            </div>
            <button type="submit" disabled={!!loadingProvider} className="w-full py-3 px-4 bg-primary hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out disabled:bg-amber-400 disabled:cursor-not-allowed flex items-center justify-center text-sm sm:text-base">
                {loadingProvider === 'email' && <SpinnerIcon />}
                <span className={loadingProvider === 'email' ? 'ml-3' : ''}>
                    {loadingProvider === 'email' ? 'Logging In...' : 'Log In'}
                </span>
            </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
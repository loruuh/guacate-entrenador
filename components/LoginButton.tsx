'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/useAuth';

const GoogleIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
  </svg>
);

export function LoginButton() {
  const { user } = useAuth();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        });
        if (error) throw error;
        setSuccessMsg('Bestätigungslink wurde gesendet – check deine Emails!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setShowEmailModal(false);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowEmailModal(false);
    setError('');
    setSuccessMsg('');
    setEmail('');
    setPassword('');
    setIsSignUp(false);
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-300">{user.email}</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="group relative px-4 py-2 md:px-6 md:py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2 text-sm md:text-base"
        >
          <GoogleIcon />
          <span className="hidden sm:inline">Mit Google</span>
          <span className="sm:hidden">Google</span>
          <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
        </button>

        {/* Email Login */}
        <button
          onClick={() => setShowEmailModal(true)}
          className="px-4 py-2 md:px-6 md:py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all hover:scale-105 text-sm md:text-base flex items-center gap-2"
        >
          <span>📧</span>
          <span className="hidden sm:inline">Email</span>
        </button>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {isSignUp ? 'Registrieren' : 'Anmelden'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white text-3xl leading-none">
                ×
              </button>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="deine@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Passwort</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Mindestens 6 Zeichen"
                />
              </div>

              {error && (
                <div className="bg-red-900/30 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {successMsg && (
                <div className="bg-green-900/30 border border-green-500/50 text-green-400 px-4 py-2 rounded-lg text-sm">
                  {successMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition-all"
              >
                {loading ? 'Lädt...' : isSignUp ? 'Registrieren' : 'Anmelden'}
              </button>

              <button
                type="button"
                onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccessMsg(''); }}
                className="w-full text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                {isSignUp
                  ? 'Schon einen Account? Anmelden'
                  : 'Noch kein Account? Registrieren'}
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-800 text-gray-500">oder</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              <GoogleIcon />
              Mit Google anmelden
            </button>
          </div>
        </div>
      )}
    </>
  );
}

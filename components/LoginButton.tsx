'use client';

import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/useAuth';

export function LoginButton() {
  const { user } = useAuth();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-300">{user.email}</span>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-white"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
    >
      Login
    </button>
  );
}

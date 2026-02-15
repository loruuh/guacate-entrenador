'use client';

import { useAuth } from '@/lib/useAuth';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Subscription {
  status: string;
  stripe_customer_id: string;
  expires_at: string;
}

export default function AccountPage() {
  const { user, loading: authLoading } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    supabase
      .from('subscriptions')
      .select('status, stripe_customer_id, expires_at')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()
      .then(({ data }) => {
        setSubscription(data);
        setLoading(false);
      });
  }, [user]);

  const handleManageSubscription = async () => {
    if (!subscription?.stripe_customer_id) return;
    setPortalLoading(true);

    try {
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: subscription.stripe_customer_id,
        }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch {
      setPortalLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Lädt...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-4">Bitte einloggen</h1>
          <Link
            href="/"
            className="text-primary hover:underline"
          >
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  const isActive = subscription?.status === 'active' &&
    new Date(subscription.expires_at) > new Date();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          ← Zurück zu Modulen
        </Link>

        <div className="bg-white/5 border border-primary/20 rounded-2xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Mein Account</h1>

          {/* User Info */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">
              Account
            </h2>
            <p className="text-white">{user.email}</p>
          </div>

          {/* Subscription Status */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
              Abo-Status
            </h2>
            {isActive ? (
              <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
                <p className="text-green-400 font-semibold">Advance aktiv</p>
                <p className="text-gray-400 text-sm mt-1">
                  Läuft bis: {new Date(subscription!.expires_at).toLocaleDateString('de-DE')}
                </p>
              </div>
            ) : (
              <div className="bg-white/5 border border-gray-600 rounded-xl p-4">
                <p className="text-gray-400">Kein aktives Abo</p>
                <Link
                  href="/"
                  className="text-primary text-sm hover:underline mt-1 inline-block"
                >
                  Jetzt upgraden →
                </Link>
              </div>
            )}
          </div>

          {/* Manage Subscription */}
          {isActive && subscription?.stripe_customer_id && (
            <button
              onClick={handleManageSubscription}
              disabled={portalLoading}
              className="w-full bg-primary hover:bg-primary/80 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
            >
              {portalLoading ? 'Lädt...' : 'Abo verwalten / kündigen'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

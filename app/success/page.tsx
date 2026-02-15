'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (sessionId) {
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setStatus('success');

            setTimeout(() => {
              router.push('/');
            }, 3000);
          } else {
            setStatus('error');
          }
        })
        .catch(() => setStatus('error'));
    } else {
      setStatus('error');
    }
  }, [searchParams, router]);

  return (
    <div className="text-center">
      {status === 'loading' && (
        <>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Zahlung wird überprüft...</p>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold mb-2 text-white">Willkommen bei Advance!</h1>
          <p className="text-gray-400 mb-4">
            Alle Module sind jetzt freigeschaltet!
          </p>
          <div className="text-sm text-gray-500">
            Weiterleitung in 3 Sekunden...
          </div>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold mb-2 text-white">Etwas ist schiefgelaufen</h1>
          <p className="text-gray-400 mb-4">
            Die Zahlung konnte nicht überprüft werden.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Zurück zur Startseite
          </button>
        </>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Laden...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}

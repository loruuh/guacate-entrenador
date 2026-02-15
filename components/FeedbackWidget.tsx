'use client';

import { useState } from 'react';

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const subject = encodeURIComponent('LingoLuup Feedback');
    const body = encodeURIComponent(
      `Feedback: ${feedback}\n\n${email ? `Antwort an: ${email}` : 'Keine Email angegeben'}`
    );

    window.location.href = `mailto:sven.bixenstein@gmail.com?subject=${subject}&body=${body}`;

    setStatus('sent');
    setTimeout(() => {
      setIsOpen(false);
      setFeedback('');
      setEmail('');
      setStatus('idle');
    }, 2000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-purple-500 to-pink-500 text-white w-14 h-14 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Feedback senden"
      >
        <span className="text-2xl">💬</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">💬 Feedback</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Dein Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                  rows={5}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Was gefällt dir? Was könnte besser sein?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Deine Email (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Für Rückmeldung"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {status === 'sending' ? 'Sende...' : status === 'sent' ? '✓ Gesendet!' : 'Feedback senden'}
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Dein Feedback hilft LingoLuup besser zu werden!
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// User Subscription Status (in localStorage)
export function isPremiumUser(): boolean {
  if (typeof window === 'undefined') return false;

  const subscription = localStorage.getItem('premium-subscription');
  if (!subscription) return false;

  try {
    const data = JSON.parse(subscription);
    return data.status === 'active' && data.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export function setPremiumStatus(customerId: string, expiresAt: number) {
  localStorage.setItem('premium-subscription', JSON.stringify({
    status: 'active',
    customerId,
    expiresAt,
  }));
}

export function clearPremiumStatus() {
  localStorage.removeItem('premium-subscription');
}

// Nur Modul 1 ist kostenlos
const FREE_MODULES = ['vokabeln-1'];

export function isPremiumModule(moduleId: string): boolean {
  return !FREE_MODULES.includes(moduleId);
}

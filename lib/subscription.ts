import { supabase } from './supabase';

export async function hasAdvanceAccess(userId: string): Promise<boolean> {
  // Check if admin
  const { data: adminData } = await supabase
    .from('admins')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (adminData) return true; // Admin = always advance!

  // Check subscription
  const { data: subData } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();

  if (!subData) return false;

  // Check if expired
  return new Date(subData.expires_at) > new Date();
}

// Nur Modul 1 ist kostenlos
const FREE_MODULES = ['vokabeln-1'];

export function isAdvanceModule(moduleId: string): boolean {
  return !FREE_MODULES.includes(moduleId);
}

import { supabase } from "../../supabaseClient";

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'cashier' | 'support' | 'account_manager' | 'parent';
  subscriptionType: 'trial' | 'basic' | 'complete';
  isPremium: boolean;
}

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
};

export const syncUserFromSupabase = (sbUser: any): User | null => {
  if (!sbUser) {
    localStorage.removeItem('currentUser');
    return null;
  }
  
  // Đảo thứ tự: lấy display_name trước, nếu không có mới lấy full_name của Google
  const nameFromMetadata = sbUser.user_metadata?.display_name || 
                           sbUser.user_metadata?.full_name || 
                           'User';

  const user: User = {
    id: sbUser.id,
    email: sbUser.email || '',
    name: nameFromMetadata, 
    role: sbUser.user_metadata?.user_role || 'parent',
    subscriptionType: 'trial',
    isPremium: false,
  };
  
  localStorage.setItem('currentUser', JSON.stringify(user));
  return user;
};

export const logout = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem('currentUser');
  window.location.href = "/login";
};
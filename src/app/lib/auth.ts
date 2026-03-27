// Mock authentication utilities
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'cashier' | 'support' | 'account_manager' | 'parent';
  subscriptionType: 'trial' | 'basic' | 'complete';
  isPremium: boolean;
}

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Administrator',
    role: 'admin',
    subscriptionType: 'complete',
    isPremium: true,
  },
  {
    id: '2',
    email: 'parent@example.com',
    name: 'Phụ huynh',
    role: 'parent',
    subscriptionType: 'trial',
    isPremium: false,
  },
];

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  if (userJson) {
    return JSON.parse(userJson);
  }
  return null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};

export const login = (email: string, password: string): User | null => {
  // Mock login
  const user = mockUsers.find(u => u.email === email);
  if (user) {
    setCurrentUser(user);
    return user;
  }
  return null;
};

export const logout = () => {
  setCurrentUser(null);
};

export const register = (email: string, password: string, name: string): User => {
  // Mock registration
  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    role: 'parent',
    subscriptionType: 'trial',
    isPremium: false,
  };
  setCurrentUser(newUser);
  return newUser;
};
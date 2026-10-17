import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const clubAdmin = { id: 'tuan-kiet', name: 'Tuan Kiet', role: 'Club Admin', initials: 'TK' };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => sessionStorage.getItem('179fc-demo-session') === 'active' ? clubAdmin : null);
  const value = useMemo(() => ({ user, signIn: () => { sessionStorage.setItem('179fc-demo-session', 'active'); setUser(clubAdmin); }, signOut: () => { sessionStorage.removeItem('179fc-demo-session'); setUser(null); } }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider.');
  return context;
}

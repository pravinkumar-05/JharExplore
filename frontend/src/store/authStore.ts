import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qdxdwrpljyejupksredi.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeGR3cnBsanllanVwa3NyZWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NzI4ODQsImV4cCI6MjA5MjQ0ODg4NH0.V1vYMiqOHhAM1UpvocLa_p0I95X6nQlLCdoAYI1pDXs';
export const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : null as unknown as ReturnType<typeof createClient>;

interface User {
  id: string;
  email: string;
  full_name?: string;
}

interface Session {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, session: Session) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: true,
      setAuth: (user, session) => set({ user, session, isAuthenticated: true, isLoading: false }),
      clearAuth: () => set({ user: null, session: null, isAuthenticated: false, isLoading: false }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    { name: 'auth-storage' }
  )
);

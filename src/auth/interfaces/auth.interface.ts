export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    created_at: string;
  }
}

export interface userProfile {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at?: string;
}
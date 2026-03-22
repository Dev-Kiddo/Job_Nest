export interface UserInitialState {
  currentUser: any | null;
  oauthUrl: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  success: boolean;
}

export interface RootState extends UserInitialState {
  user: UserInitialState;
}

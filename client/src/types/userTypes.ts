export interface UserInitialState {
  currentUser: any | null;
  authChecking: boolean;
  loading: boolean;

  // Message
  message: string | null;
  messageType: "success" | "error" | "info" | null;
  isMessageShown: boolean;
}

export interface RootState extends UserInitialState {
  user: UserInitialState;
}

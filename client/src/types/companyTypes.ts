export interface CompanyInitialState {
  loading: boolean;
  company: any | null;

  // Message
  message: string | null;
  messageType: "success" | "error" | "info" | null;
  isMessageShown: boolean;
}

export interface RootState extends UserInitialState {
  user: UserInitialState;
}

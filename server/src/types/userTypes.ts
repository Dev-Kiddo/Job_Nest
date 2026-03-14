export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "moderator";
  profile: {
    avatar: string;
    bio: string;
    phone: string;
  };
  skills: string[];
  posts: string[];
  isActive: boolean;
  deletedAt: Date;
}

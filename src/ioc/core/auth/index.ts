//TODO: import { User } from "@/models/user";
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export interface IAuthService {
  getUser: () => Promise<User>;
}

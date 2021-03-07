import { User } from '../user/user.entity';

export interface IAuthResponse {
  token: string;
  data: {
    user: User;
  };
}

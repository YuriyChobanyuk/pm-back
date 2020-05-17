import { UserRole } from '../user/user-role.enum';

export interface JwtPayloadInterface {
  role: UserRole;
  name: string;
  userId: string;
}

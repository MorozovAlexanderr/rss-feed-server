import { User } from '@/modules/user/user.types';

export type SignUpPayload = Pick<User, 'username' | 'email' | 'password'>;

export type SignInPayload = Pick<User, 'email' | 'password'>;

export interface AccessToken {
  accessToken: string;
}

import { Response } from 'express';
import { ContextRequest, UserRequest } from '@/common/types/requests.types';

class UserController {
  public me = async (
    { context: { user } }: ContextRequest<UserRequest>,
    res: Response
  ) => {
    res.json({ user: user });
  };
}

export default UserController;

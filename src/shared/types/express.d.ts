import { User } from '../../modules/systems/user/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};

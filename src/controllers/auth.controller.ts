import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ success: 'true', message: 'HR Profile Created Successfully', data: user });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      res.json({ success: 'true',message: 'Login Successfully', token: result });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

import db from '../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError';

class AuthService {
  async register({ name, email, password }: { name: string; email: string; password: string }) {
    const existingUser = await db('hr_users').where({ email }).first();
    if (existingUser) throw new AppError('Email already in use', 409);

    const password_hash = await bcrypt.hash(password, 10);

    const [user] = await db('hr_users').insert({ name, email, password_hash }).returning(['id', 'email', 'name']);

    return user;
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await db('hr_users').where({ email }).first();
    if (!user) throw new AppError('Invalid email or password', 401);

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) throw new AppError('Invalid email or password', 401);

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    return { token };
  }
}

export default new AuthService();

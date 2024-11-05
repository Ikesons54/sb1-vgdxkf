import { User, CreateUserDto } from '../models/user.model';
import { AppError } from '../middleware/errorHandler';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  private users: User[] = [];

  async createUser(userData: CreateUserDto): Promise<User> {
    const existingUser = this.users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new AppError(400, 'User with this email already exists');
    }

    const newUser: User = {
      id: uuidv4(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.push(newUser);
    return newUser;
  }

  async getUserById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}
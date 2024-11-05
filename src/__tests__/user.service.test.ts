import { UserService } from '../services/user.service';
import { CreateUserDto } from '../models/user.model';
import { AppError } from '../middleware/errorHandler';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('createUser', () => {
    const mockUser: CreateUserDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    };

    it('should create a new user successfully', async () => {
      const user = await userService.createUser(mockUser);
      expect(user).toHaveProperty('id');
      expect(user.email).toBe(mockUser.email);
      expect(user.name).toBe(mockUser.name);
    });

    it('should throw error if user with email already exists', async () => {
      await userService.createUser(mockUser);
      await expect(userService.createUser(mockUser)).rejects.toThrow(AppError);
    });
  });

  describe('getUserById', () => {
    it('should return user if exists', async () => {
      const created = await userService.createUser({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      });
      const found = await userService.getUserById(created.id);
      expect(found).toEqual(created);
    });

    it('should throw error if user not found', async () => {
      await expect(userService.getUserById('nonexistent')).rejects.toThrow(AppError);
    });
  });
});
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../models/user.model';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser = async (req: Request, res: Response) => {
    const userData: CreateUserDto = req.body;
    const user = await this.userService.createUser(userData);
    res.status(201).json({
      status: 'success',
      data: user
    });
  };

  public getUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.getUserById(id);
    res.status(200).json({
      status: 'success',
      data: user
    });
  };

  public getAllUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();
    res.status(200).json({
      status: 'success',
      data: users
    });
  };
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repositiry';
import { AddUserDto } from './dto/add-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async addUser(addUserDto: AddUserDto): Promise<User> {
    return this.userRepository.addUser(addUserDto);
  }

  async deleteUser(userId: string) {
    return this.userRepository.deleteUser(userId);
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(updateUserDto);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(userId: string): Promise<User> {
    return await this.userRepository.findOne(userId);
  }
}

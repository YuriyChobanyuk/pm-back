/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repositiry';
import { AddUserDto } from './dto/add-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async addUser(addUserDto: AddUserDto): Promise<User> {
    return this.userRepository.addUser(addUserDto);
  }

  async deleteUser(userId: string) {
    return this.userRepository.delete(userId);
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    const { img_path, email, name, id } = updateUserDto;
    return this.userRepository.update(id, { img_path, email, name });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUser(userId: string): Promise<User> {
    return this.userRepository.findOne(userId);
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }
}

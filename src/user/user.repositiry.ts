import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AddUserDto } from './dto/add-user.dto';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { UpdateUserDto } from './dto/update-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async addUser(addUserDto: AddUserDto): Promise<User> {
    try {
      const hashedPassword = await this.hashPassword(addUserDto.password);
      const user = this.create({
        ...addUserDto,
        password: hashedPassword,
      });

      await user.save();

      return user;
    } catch (err) {
      console.error(err);
      if (err.code === '23505') {
        throw new ConflictException('Duplicate email');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }
}

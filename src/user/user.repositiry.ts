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
      const { email, img_path, name, password, role } = addUserDto;
      const user = new User();

      user.name = name;
      user.password = await this.hashPassword(password);
      user.email = email;
      user.role = role;
      user.img_path = img_path;

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

  async deleteUser(userId: string): Promise<void> {
    try {
      await this.createQueryBuilder('public."user"')
        .delete()
        .where('"user".id = :userId', {
          userId,
        })
        .execute();
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('Delete user error');
    }
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const { email, id, img_path, name, password } = updateUserDto;
    try {
      const user = await this.findOne(id, {
        select: ['password', 'img_path', 'name', 'email']
      });

      let newPassword: string;
      if (password) {
        newPassword = await this.hashPassword(password);
      }

      user.email = email || user.email;
      user.img_path = img_path || user.img_path;
      user.name = name || user.name;
      user.password = newPassword || user.password;

      const updatedUser = await user.save();
      return this.sanitizeUser(updatedUser);
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('Update user error');
    }
  }

  private sanitizeUser(user: User) {
    delete user.password;
    delete user.created_at;
    delete user.active;
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }
}

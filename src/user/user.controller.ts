import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Delete,
  Param,
  Get,
  Put,
  UseInterceptors, ClassSerializerInterceptor, UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AddUserDto } from './dto/add-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from '../auth/guards/admin.guard';
import { API_V1 } from '../common/constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller(`${API_V1}/users`)
export class UserController {
  constructor(private userService: UserService) {
  }

  @UseGuards(AdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:userId')
  getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  addUser(@Body(ValidationPipe) addUserDto: AddUserDto): Promise<User> {
    return this.userService.addUser(addUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  updateUser(@Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  @Delete('/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}

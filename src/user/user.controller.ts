import { Body, Controller, Post, ValidationPipe, Delete, Param, Patch, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { AddUserDto } from './dto/add-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:userId')
  getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @Post()
  addUser(@Body(ValidationPipe) addUserDto: AddUserDto): Promise<User> {
    return this.userService.addUser(addUserDto);
  }

  @Patch()
  updateUser(@Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  @Delete('/:userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}

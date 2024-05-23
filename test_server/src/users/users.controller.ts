import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly users = [];

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    let user = JSON.stringify(createUserDto);
    this.users.push(user);
    return `User ${user} created successfully!`;
  }

  @Get()
  findAll() {
    return JSON.stringify(this.users);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (this.users[id]) {
      return JSON.stringify(this.users[id]);
    } else {
      return `No user found with id ${id}!`;
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let old_user_state = null;
    let new_user_state = null;
    if (this.users[id]) {
      old_user_state = JSON.stringify(this.users[id]);
      new_user_state = JSON.stringify(updateUserDto);
      this.users[id] = new_user_state;
      return JSON.stringify(
        `User ${id} changed from ${old_user_state} to ${new_user_state}!`,
      );
    } else {
      return `No user found with id ${id}!`;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (this.users[id]) {
      this.users.splice(Number(id), 1);
      return `User with id ${id} deleted successfully!`;
    } else {
      return `No user found with id ${id}!`;
    }
  }
}

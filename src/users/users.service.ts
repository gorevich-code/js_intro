import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [];

  create(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    return `New user ${JSON.stringify(createUserDto)} created successfully!`;
  }

  findAll() {
    return `All users: ${JSON.stringify(this.users)}`;
  }

  findOne(id: number) {
    if (this.users[id]) {
      return `User with id ${id}: ${JSON.stringify(this.users[id])}`;
    } else {
      return `User with id ${id} not found`;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    if (this.users[id]) {
      this.users[id] = updateUserDto;
      return `User with id ${id} changed to: ${JSON.stringify(this.users[id])}`;
    } else {
      return `User with id ${id} not found`;
    }
  }

  remove(id: number) {
    if (this.users[id]) {
      let user = JSON.stringify(this.users[id]);
      this.users.splice(id, 1);
      return `User with id ${id} deleted: ${JSON.stringify(user)}`;
    } else {
      return `User with id ${id} not found`;
    }
  }
}

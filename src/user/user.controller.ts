import { Controller, Post, Body, Get, Put, Delete, Param, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {

    constructor(private service: UserService) { }

    @Get('/hello-world')
    async helloWorld(): Promise<string> {
        return "Hello World from User Controller!";
    }

    @Get()
    getAll() {
        return this.service.getUsers();
    }

    @Get(':id')
    getOne(@Param() params) {
        return this.service.getUser(params.id);
    }

    @Post()
    create(@Body() user: User) {
        return this.service.createUser(user);
    }

    @Put(':id')
    update(@Param() id, @Body() user: User) {
        return this.service.updateUser(id, user);
    }

    @Delete(':id')
    deleteUser(@Param() id) {
        return this.service.deleteUser(id);
    }

}

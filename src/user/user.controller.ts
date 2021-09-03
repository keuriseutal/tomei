import { Controller, Post, Body, Get, Put, Delete, Param, UseInterceptors, UploadedFile, Res, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import path = require('path');
import fs = require('fs');

@Controller('user')
export class UserController {

    constructor(private service: UserService) { }

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

    @Post('upload/avatar')
    @UseInterceptors(FileInterceptor('avatar',
    {
        storage: diskStorage({
            destination: './uploads/avatar',
            filename: (req, file, cb) => {
                const originalFilename = path.parse(file.originalname);
                const filename: string = originalFilename.name.replace(/\sg/, '');
                const extension: string = originalFilename.ext;

                cb(null, `${filename}${extension}`)
            }
        })
    }))
    uploadAvatar(@UploadedFile() file): Observable<Object> {
        return of({imagePath: file.filename});
    }

    @Get('avatar/:filename')    
    getAvatar(@Param('filename') filename, @Res() res): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), `uploads/avatar/${filename}`)));
    }
    
    @Delete('avatar/:filename')    
    deleteAvatar(@Param('filename') filename, @Req() req) {
        return fs.unlinkSync(join(process.cwd(), `uploads/avatar/${filename}`));
    }

}

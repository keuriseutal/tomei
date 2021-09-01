import { Injectable  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUser(id: string): Promise<User> {
        return await this.usersRepository.findOne(id);
    }

    async createUser(user: User) {
        return await this.usersRepository.save(user)
    }

    async updateUser(id: string, user: User) {
        const oldUser = await this.getUser(id);
        return await this.usersRepository.save({
            ...oldUser, ...user
        })
    }

    async deleteUser(id: string) {
        const user = await this.getUser(id);
        return await this.usersRepository.delete(user);
    }
}

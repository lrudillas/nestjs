import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        private readonly sequelize: Sequelize,
    ) {}

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.username = createUserDto.username;
        user.password = createUserDto.password;

        return user.save();
    }

    async findAll(): Promise<User[]> {
        try {
            await this.sequelize.transaction(async t => {
                const transactionHost = { transaction: t };

                await this.userModel.create(
                    { id: 1, username: 'Abraham', password: 'Lincoln' },
                    transactionHost
                );
                await this.userModel.create(
                    { id: 2, username: 'John', password: 'Boothe' },
                    transactionHost
                );
            });
        } catch (err) {

        }
        return this.userModel.findAll();
    }

    findOne(username: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                username
            },
        });
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }
}
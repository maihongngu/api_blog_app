import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { username } });
  }

  async updateUser(username: string, data): Promise<UserEntity> {
    await this.userRepo.update({ username }, data);
    return this.findByUsername(username);
  }

  async followUser(currentUser: UserEntity, username: string) {
    const user = await this.userRepo.findOne({
      where: { username },
      relations: ['followers'],
    });

    user.followers.push(currentUser);

    await user.save();

    return user.toFollowing(currentUser);
  }

  async unfollowUser(currentUser: UserEntity, username: string) {
    const user = await this.userRepo.findOne({
      where: { username },
      relations: ['followers'],
    });

    user.followers = user.followers.filter(
      follower => follower === currentUser,
    );

    await user.save();

    return user.toFollowing(currentUser);
  }
}

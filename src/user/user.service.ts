import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { AdvertisementsService } from "../advertisements/advertisements.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private advertisementService: AdvertisementsService
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
  }

  async create(user: CreateUserDto): Promise<User | undefined> {
    return await this.userRepository.save(user);
  }

  async getFavAdv(user: User) {
    return await this.userRepository.findOne({ where: { id: user.id }, relations: ["favAdvs"] });
  }

  async addFavAdv(user: User, advId: number) {
    const { adv } = await this.advertisementService.getOne(advId);
    return await this.userRepository.createQueryBuilder().relation(User, "favAdvs").of(user).add(adv);
  }

  async getAllChats(id: number) {
    return await this.userRepository
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .leftJoinAndSelect("user.chats", "chat")
      .leftJoinAndSelect("chat.users", "users")
      .getOne();
  }
}

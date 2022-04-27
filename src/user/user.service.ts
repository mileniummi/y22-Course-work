import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { AdvertisementsService } from "../advertisements/advertisements.service";
import { Advertisement } from "../advertisements/entities/advertisement.entity";

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

  async addFavAdv(user: User, advId: number) {
    const { adv } = await this.advertisementService.getOne(advId);
    return this.userRepository.createQueryBuilder().relation(Advertisement, "favAdvs").of(user).add(adv);
  }
}

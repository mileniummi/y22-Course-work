import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Advertisement } from "./entities/advertisement.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private advertisementsRepository: Repository<Advertisement>
  ) {}
  async getFlatList() {
    const advertisements = await this.advertisementsRepository.find({});
    return { user: { login: "user" }, advertisements: advertisements };
  }

  async getSingleFlat(id) {
    const advertisement = await this.advertisementsRepository.findOne({
      where: { id },
    });
    return {
      user: { login: "user" },
      adv: { ...advertisement },
    };
  }
}

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
  async getFlatList() {}

  async getSingleFlat(id) {}
}

import { Injectable } from "@nestjs/common";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Advertisement } from "../advertisements/entities/advertisement.entity";
import { Repository } from "typeorm";

@Injectable()
export class AddAdvertisementService {
  constructor(
    @InjectRepository(Advertisement)
    private advertisementsRepository: Repository<Advertisement>
  ) {}

  async create(
    advertisement: CreateAdvertisementDto,
    images: Array<Express.Multer.File>
  ) {}
}

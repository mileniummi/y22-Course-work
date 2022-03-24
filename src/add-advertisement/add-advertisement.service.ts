import { Injectable } from "@nestjs/common";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Advertisement } from "../advertisements/entities/advertisement.entity";
import { Repository } from "typeorm";
import { databaseImage } from "../advertisements/entities/databaseImage.entity";

@Injectable()
export class AddAdvertisementService {
  constructor(
    @InjectRepository(Advertisement)
    private advertisementsRepository: Repository<Advertisement>,
    @InjectRepository(databaseImage)
    private databaseImageRepository: Repository<databaseImage>
  ) {}

  async create(
    advertisement: CreateAdvertisementDto,
    images: Array<Express.Multer.File>
  ) {
    const newImages = [];
    for (const image of images) {
      const newImage = await this.databaseImageRepository.create({
        filename: image.originalname,
        mimetype: image.mimetype,
        data: image.buffer,
      });
      await this.databaseImageRepository.save(newImage);
      newImages.push(newImage);
    }
    await this.advertisementsRepository.save({
      ...advertisement,
      images: newImages,
    });
  }
}

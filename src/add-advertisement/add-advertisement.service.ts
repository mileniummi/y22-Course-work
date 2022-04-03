import { Injectable } from "@nestjs/common";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Advertisement } from "../advertisements/entities/advertisement.entity";
import { Repository } from "typeorm";
import * as EasyYandexS3 from "easy-yandex-s3";

@Injectable()
export class AddAdvertisementService {
  private readonly yandexStorage;
  constructor(
    @InjectRepository(Advertisement)
    private advertisementsRepository: Repository<Advertisement>
  ) {
    this.yandexStorage = new EasyYandexS3({
      auth: {
        accessKeyId: process.env.YANDEX_STORAGE_KEY_ID,
        secretAccessKey: process.env.YANDEX_STORAGE_KEY,
      },
      Bucket: process.env.YANDEX_STORAGE_BUCKET_NAME,
      debug: false,
    });
  }

  async create(
    advertisement: CreateAdvertisementDto,
    images: Array<Express.Multer.File>
  ) {
    const imagesLinks = [];
    for (const image of images) {
      const imageLink = await this.saveImageInCloud(image.buffer);
      if (imageLink) {
        imagesLinks.push(imageLink);
      }
    }
    await this.advertisementsRepository.save({
      ...advertisement,
      images: imagesLinks,
    });
  }

  async saveImageInCloud(data) {
    const upload = await this.yandexStorage.Upload(
      { buffer: data },
      "/advertisements/"
    );
    if (upload === false) {
      console.log("Something went wrong when uploading photo to Yandex Cloud");
      return;
    }
    return upload.Location;
  }
}

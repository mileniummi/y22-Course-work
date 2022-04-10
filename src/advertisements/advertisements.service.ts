import { Injectable } from "@nestjs/common";
import { Between, LessThan, Like, MoreThan, Repository } from "typeorm";
import { Advertisement } from "./entities/advertisement.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as EasyYandexS3 from "easy-yandex-s3";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { SearchAdvertisementDto } from "./dto/search-advertisement.dto";

@Injectable()
export class AdvertisementsService {
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
  async getFlatList(searchOptions: SearchAdvertisementDto) {
    let advertisements: Advertisement[];
    if (Object.keys(searchOptions).length) {
      advertisements = await this.advertisementsRepository.find({
        where: {
          dealType: searchOptions.dealType,
          dealObject: searchOptions.dealObject,
          price: Between(
            searchOptions.smallestPrice ? searchOptions.smallestPrice : 0,
            searchOptions.biggestPrice ? searchOptions.biggestPrice : Infinity
          ),
          roomCount:
            searchOptions.roomCount === 4
              ? MoreThan(3)
              : searchOptions.roomCount,
          location: Like(`%${searchOptions.address}%`),
        },
      });
    } else {
      advertisements = await this.advertisementsRepository.find({});
    }
    return { user: { login: "user" }, advertisements: advertisements };
  }

  async getSingleFlat(id) {
    const advertisement = await this.advertisementsRepository.findOne({
      where: { id },
    });
    return {
      user: { login: "user" },
      adv: advertisement ? { ...advertisement } : undefined,
    };
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

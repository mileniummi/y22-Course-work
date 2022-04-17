import { Injectable } from "@nestjs/common";
import { Between, Like, MoreThan, Repository } from "typeorm";
import { Advertisement, DealType } from "./entities/advertisement.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { SearchAdvertisementDto } from "./dto/search-advertisement.dto";
import { YandexStorageService } from "./yandex.storage.service";

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private advertisementsRepository: Repository<Advertisement>,
    private yandexStorageService: YandexStorageService
  ) {}

  async getAll(searchOptions: SearchAdvertisementDto, dealType: DealType) {
    let advertisements: Advertisement[];
    if (Object.keys(searchOptions).length > 0) {
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
      return {
        user: { login: "user" },
        advertisements,
        amountOfRoomsText: searchOptions.roomCount
          ? searchOptions.roomCount + "-комнатную"
          : "",
        dealTypeText:
          searchOptions.dealType === DealType.SELL ? "Купить" : "Арендовать",
      };
    } else {
      advertisements = await this.advertisementsRepository.find({
        where: { dealType },
      });
      return { advertisements, amountOfRoomsText: "", dealTypeText: "" };
    }
  }

  async getOne(id) {
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
    if (images) {
      for (const image of images) {
        const imageLink = await this.yandexStorageService.save(image.buffer);
        if (imageLink) {
          imagesLinks.push(imageLink);
        }
      }
    }
    await this.advertisementsRepository.save({
      ...advertisement,
      images: imagesLinks,
    });
  }
}
